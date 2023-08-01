import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

import { NoticiasService } from '../services/noticias.service'

@Component({
  selector: 'Favoritos',
  templateUrl: './favoritos.component.html',
  providers: [NoticiasService]
})
export class FavoritosComponent implements OnInit {
  constructor(public noticias: NoticiasService) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
    
  }

}
