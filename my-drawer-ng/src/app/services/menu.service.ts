import { ElementRef, Injectable } from "@angular/core";

@Injectable()
export class MenuService {
    private archivado: Array<ElementRef> = [];
    private borrado: Array<ElementRef> = [];

    archivar(s: ElementRef) {
        this.archivado.push(s);
    }

    borrar(s: ElementRef)  {
        this.borrado.push(s)
    }
}