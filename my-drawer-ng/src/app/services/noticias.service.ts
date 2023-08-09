import { Injectable } from "@angular/core";
import { getJSON, request } from "@nativescript/core/http";
import { AppState } from "../app.module";
import { Store } from "@ngrx/store";
import { DesfavoritaAction, FavoritaAction, Favoritos, IniciaFavoritosAction } from "./noticias-state.model";

const sqlite = require("nativescript-sqlite");

@Injectable()
export class NoticiasService {
  api: string = "https://big-parents-love.loca.lt";
  favoritos: string[] = [];
 
  constructor(
    private store: Store<AppState>
  ) {
     console.log("Inicia el servicio");
    this.getDb(
      (db) => {
        db.each(
          "select texto from favs",
          (err: any, fila: string) => {
            
            console.log("fila: ", fila); 
            this.favoritos.push(fila.toString());          
        },
          (err, totales) => {console.log("Filas totales: ", totales);
          console.log("---CONSTRUCTOR---"+this.favoritos);
        }
        );
      },
      () => console.log("error on getDB")
    );

//    this.store.dispatch(new IniciaFavoritosAction(this.favoritos));
  }

  getDb(fnOk, fnError) {
    return new sqlite("mi_db_favs", (err, db) => {
      if (err) {
        console.error("Error al abrir db!", err);
      } else {
        console.log("Está la db abierta: ", db.isOpen() ? "Si" : "No");
        db.execSQL(
          "CREATE TABLE IF NOT EXISTS favs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)"
        ).then(
          (id) => {
            console.log("CREATE TABLE OK");
            fnOk(db);
          },
          (error) => {
            console.log("CREATE TABLE ERROR", error);
            fnError(error);
          }
        );
      }
    });
  }

  agregar(s: string) {
    return request({
      url: this.api + "/favs",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
        nuevo: s,
      }),
    });
  }

  favs(s: string) {
    return getJSON(this.api + "/favs");
  }

  buscar(s: string) {
    return getJSON(this.api + "/get?q=" + s); 
  }

  addFavorito(s: string)  {
   this.store.dispatch(new FavoritaAction(new Favoritos(s)));
     this.getDb((db) => {
    db.execSQL("insert into favs (texto) values (?)", [s],
      (err, id) => console.log("nuevo id: ", id));
  }, () => console.log("error on getDB"));

  this.favoritos.push(s);

   /* console.log("-------add-------"+this.favoritos)
    this.getDb((db) => {
      db.execSQL("insert into favs (texto) values (?)", [s],
        (err, id) => console.log("nuevo id: ", id));
    }, () => console.log("error on getDB"));
    this.favoritos.push(s);
    console.log("_________----_________"+ this.favoritos); */
  }

  removeFavorito(s: string)  {
    this.store.dispatch(new DesfavoritaAction(new Favoritos(s)));
    this.getDb((db) => {
    db.execSQL("delete from favs where texto = (?)", [s],
      (err, id) => console.log("nuevo id: ", id));
  }, () => console.log("error on getDB"));
  this.favoritos = this.favoritos.filter(del => del != s);

    /* this.getDb((db) => {
      db.execSQL("delete from favs where texto = (?)", [s],
        (err, id) => console.log("nuevo id: ", id));
    }, () => console.log("error on getDB"));
    this.favoritos = this.favoritos.filter(del => del != s);
    console.log("_________----_________"+ this.favoritos);
 */  
  }  

  esFavorito(x: string) {{
    let result: boolean = false
    this.store.select(store => store.favoritos.items).subscribe(store => {
      return store.indexOf(new Favoritos(x));
    } )
  }}
}

