import { Component, Input, OnInit, ViewContainerRef } from "@angular/core";
import { Application, zIndexProperty } from "@nativescript/core";
import { ToastDuration, Toasty } from "@triniwiz/nativescript-toasty";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
//import * as dialogs from "@nativescript/core";
import * as dialogs from "@nativescript/core/ui/dialogs";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { Noticia, NuevaNoticiaAction } from "../services/noticias-state.model";

import { DetalleModel } from "./detalle.model";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular";
import { DialogContent } from "./editar-detalle.component";

@Component({
  selector: "DetalleComponent",
  templateUrl: "./dettalle.component.html",
})
export class DetalleComponent implements OnInit {
  ofertas: DetalleModel[];
  result: string;
  
  constructor(
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    
    let a: DetalleModel = new DetalleModel();
    let b: DetalleModel = new DetalleModel();
    let c: DetalleModel = new DetalleModel();
    this.ofertas = [a, b, c]
    

  this.store.select((state) => state.noticias.sugerida)
  .subscribe((data) => {
    const f = data;
    if (f != null) {
      const toast = new Toasty({ text: "Sugerimos leer: "+f.titulo }).setToastDuration(
        ToastDuration.SHORT);
        console.log("Sugerimos leer: "+f);
      }
});
    
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  onPool(args) {
    const pullRefresh = args.object;
    this.ofertas.push(new DetalleModel());
    setTimeout(function () {
      pullRefresh.refreshing = false;
    }, 1000);
  }

  upTap() {
    alert("Has dato un Like");
  }

  downTap() {
    alert("has dado un disLike");
  }

  doLater(fn) {
    setTimeout(fn, 1000);
  }

  edit(x: DetalleModel) {
    //    alert(x.name);

    dialogs
      .prompt({
        title: "Editar Elemento",
        message: "Edita el nombre",
        okButtonText: "Editar",
        cancelButtonText: "Cancelar",
        //  neutralButtonText: "  ",
        defaultText: x.name,
        inputType: dialogs.inputType.text,
      })
      .then((r) => {
        if (r.result) {
          x.edit(r.text);
          const toast = new Toasty({ text: "Editado" }).setToastDuration(
            ToastDuration.SHORT
          );
          toast.show();
        }
      });
  }

  public show(x: DetalleModel) {
    let options: ModalDialogOptions = {
      context: { promptMsg: x.name },
      viewContainerRef: this.viewContainerRef,
    };
    this.modalService
      .showModal(DialogContent, options)
      .then((dialogResult: string) => {
        if (dialogResult != "close") {
          x.edit(dialogResult)
          const toast = new Toasty({ text: "Elemento Editado" }).setToastDuration(
            ToastDuration.SHORT
          );
          toast.show();
        } else {
          const toast = new Toasty({ text: "Elemento No Editado" }).setToastDuration(
            ToastDuration.SHORT
          );
          toast.show();
        }
      });
  }

  onItemTap(args): void {
    this.store.dispatch(new NuevaNoticiaAction(new Noticia(args.view.bindingContext)));
  }
}
