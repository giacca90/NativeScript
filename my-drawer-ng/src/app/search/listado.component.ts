import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular'

import { NoticiasService } from "../services/noticias.service";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { ToastDuration, Toasty } from "@triniwiz/nativescript-toasty";

@Component({
  selector: "ListadoComponent",
  templateUrl: "./listado.component.html",
  providers: [NoticiasService]
})
export class ListadoComponent implements OnInit {
  resultado: Array<string>;

  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase

  constructor(public noticias: NoticiasService, private routerExtensions: RouterExtensions, private router: Router) {}

  ngOnInit(): void {
/*     this.noticias.agregar("Documentos");
    this.noticias.agregar("Plantillas");
    this.noticias.agregar("Presentaciónes");
 */
    this._activatedUrl = '/search'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects))
     }

  onItemTap(x): void {
    console.dir(x);
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
    console.dir("buscarAhora" + s);
    this.noticias.buscar(s).then((r: any) => {
      console.log("resultado buscarAhora: "+ JSON.stringify(r));
      this.resultado = r;
    }, (e) => {
      console.log("error buscarAhora " +e);
      const toast = new Toasty({ text: "Error en la búsqueda" }).setToastDuration(ToastDuration.SHORT)
    })
  }
}
