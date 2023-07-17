import { Component, OnInit } from '@angular/core'
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
    selector: 'DetalleComponent',
    templateUrl: './dettalle.component.html'
  })

  export class DetalleComponent implements OnInit {
     ofertas: string[];
     num: number = 3;
   
    ngOnInit(): void {
      this.ofertas= ['Oferta 1', 'Oferta 2', 'Oferta 3']

    }
    
    onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>Application.getRootView()
      sideDrawer.showDrawer()
    }

    onPool(args) {
      const pullRefresh = args.object;
      this.num++;
      this.ofertas.push('Oferta '+this.num);
      setTimeout(function () {       
         pullRefresh.refreshing = false;
      }, 1000);
    }
  }