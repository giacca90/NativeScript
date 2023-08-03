import { Injectable } from "@angular/core";
import { getJSON, request } from "@nativescript/core/http";
const sqlite = require("nativescript-sqlite");

@Injectable()
export class NoticiasService {
  api: string = "https://shiny-pillows-report.loca.lt";
  favoritos: string[] = [];
 
  constructor() {
     console.log("Inicia el servicio");
    this.getDb(
      (db) => {
        db.each(
          "select texto from favs",
          (err: any, fila: string) => {
            this.favoritos.push(<string>fila);
            console.log("fila: ", fila);
            console.log("---CONSTRUCTOR---"+this.favoritos)
        },
          (err, totales) => {console.log("Filas totales: ", totales)
        }
        );
      },
      () => console.log("error on getDB")
    );
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
    console.log("-------add-------"+this.favoritos)
    this.getDb((db) => {
      db.execSQL("insert into favs (texto) values (?)", [s],
        (err, id) => console.log("nuevo id: ", id));
    }, () => console.log("error on getDB"));
    this.favoritos.push(s);
    console.log("_________----_________"+ this.favoritos);
  }

  removeFavorito(s: string)  {
    this.getDb((db) => {
      db.execSQL("delete from favs where texto = (?)", [s],
        (err, id) => console.log("nuevo id: ", id));
    }, () => console.log("error on getDB"));
    this.favoritos = this.favoritos.filter(del => del != s);
    console.log("_________----_________"+ this.favoritos);
  }

  
}

/* import { Injectable, } from '@angular/core'

@Injectable()
export class NoticiaService {
    private noticias: Array<string> = []

    agregar(s: string) {
        this.noticias.push(s);
    }

    buscar() {
        return this.noticias;
    }
}
 */
