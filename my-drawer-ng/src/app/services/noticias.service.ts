import { Injectable } from "@angular/core";
import { getJSON, request } from "tns-core-modules/http";

@Injectable()
export class NoticiasService {
  api: string = "https://clear-weeks-smell.loca.lt/";

  agregar(s: string)  {
    return request({
        url: this.api + "/favs",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            nuevo: s
        })
    });
  }

  favs(s: string)  {
    return getJSON(this.api + "/favs");
  }

  buscar(s: string)  {
    return getJSON(this.api + "/get?q=" +s)
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