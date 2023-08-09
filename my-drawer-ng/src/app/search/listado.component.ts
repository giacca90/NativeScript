import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular'
//import { Store } from "@ngrx/store";
//import { AppState } from "../app.module";
//import { Noticia, NuevaNoticiaAction } from "../services/noticias-state.model";

import { NoticiasService } from "../services/noticias.service";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { ToastDuration, Toasty } from "@triniwiz/nativescript-toasty";

@Component({
  selector: "ListadoComponent",
  templateUrl: "./listado.component.html",
})
export class ListadoComponent implements OnInit {
  resultado: string[];
  favoritos: string[] = [];

  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase

  constructor(public noticias: NoticiasService, 
    private routerExtensions: RouterExtensions, 
    private router: Router,
//    private store: Store<AppState>
    ) {
    console.log("-----LISTADO------"+this.noticias.favoritos)
    this.favoritos = this.noticias.favoritos
  }

  ngOnInit(): void {
/*     this.noticias.agregar("Documentos");
    this.noticias.agregar("Plantillas");
    this.noticias.agregar("Presentaciónes");
 */
    /*  this.store.select((state) => state.noticias.sugerida)
    .subscribe((data) => {
        const f = data;
        if (f != null) {
          const toast = new Toasty({ text: "Sugerimos leer: " }).setToastDuration(
            ToastDuration.SHORT);
            console.log("Sugerimos leer: "+f);
          }
    });
 */
    this._activatedUrl = '/search'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects))
     }

  onItemTap(args): void {
//    this.store.dispatch(new NuevaNoticiaAction(new Noticia(args.view.bindingContext)));
      this.routerExtensions.navigate(['search/detalle'], {
      transition: {
        name: 'fade',
      },
    })
  }

  onPool(args) {
    const pullRefresh = args.object;
    setTimeout(function () {
      this.noticias.agregar('Reclamos');
       pullRefresh.refreshing = false;
    }, 1000);
  }

  buscar(s: string)  {
    console.dir("buscarAhora " + s);
    console.log("al buscar: "+this.noticias.favoritos)
    this.noticias.buscar(s).then((r: any) => {
      console.log("resultado buscarAhora: "+ JSON.stringify(r));
      this.resultado = r;
    }, (e) => {
      console.log("error buscarAhora " +e);
      const toast = new Toasty({ text: "Error en la búsqueda" }).setToastDuration(ToastDuration.SHORT)
    })
    console.log("-----PRUEBA DE TIPOS-----");
    for(let i=0; i<this.noticias.favoritos.length; i++) {
      console.log("#"+i+"; "+this.noticias.favoritos[i]+"; "+ typeof this.noticias.favoritos[i])
    }
  }
}
