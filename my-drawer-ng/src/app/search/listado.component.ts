import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular'

import { NoticiaService } from "../services/noticias.service";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "ListadoComponent",
  templateUrl: "./listado.component.html",
})
export class ListadoComponent implements OnInit {
  resultado: Array<string>;

  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase

  constructor(public noticias: NoticiaService, private routerExtensions: RouterExtensions, private router: Router) {}

  ngOnInit(): void {
    this.noticias.agregar("Documentos");
    this.noticias.agregar("Plantillas");
    this.noticias.agregar("Presentaciónes");

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
    let s2: string = s.toLowerCase();
    this.resultado = this.noticias.buscar().filter((x) => x.toLowerCase().indexOf(s) >= 0)
  }
}