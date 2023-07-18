import { Component, OnInit } from '@angular/core'
import { Application } from '@nativescript/core';
import { ToastDuration, Toasty } from '@triniwiz/nativescript-toasty';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
//import * as dialogs from "@nativescript/core";
import * as dialogs from "@nativescript/core/ui/dialogs";

import { DetalleModel } from './detalle.model'

@Component({
    selector: 'DetalleComponent',
    templateUrl: './dettalle.component.html'
  })

  export class DetalleComponent implements OnInit {
    ofertas: DetalleModel[];
    
    constructor()  {}

    ngOnInit(): void {
      let a: DetalleModel = new DetalleModel;
      let b: DetalleModel = new DetalleModel;
      let c: DetalleModel = new DetalleModel;
      this.ofertas = [a, b, c]
    }
    
    onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>Application.getRootView()
      sideDrawer.showDrawer()
    }

    onPool(args) {
      const pullRefresh = args.object;
      this.ofertas.push(new DetalleModel) ;
      setTimeout(function () {       
         pullRefresh.refreshing = false;
      }, 1000);
    }

    upTap() {
      alert('Has dato un Like');
    }

    downTap()  {
      alert('has dado un disLike');
    }

    doLater(fn) { setTimeout(fn, 1000); }
    
   edit(x:DetalleModel) {
//    alert(x.name);

dialogs.prompt({
  title: "Editar Elemento",
  message: "Edita el nombre",
  okButtonText: "Editar",
  cancelButtonText: "Cancelar",
//  neutralButtonText: "  ",
  defaultText: x.name,
  inputType: dialogs.inputType.text
}).then(r => {
  if(r.result) {
    x.edit(r.text);
  const toast = new Toasty({ text: 'Editado' })
        .setToastDuration(ToastDuration.SHORT);
        toast.show();
  }
  
});
  
   }
  }