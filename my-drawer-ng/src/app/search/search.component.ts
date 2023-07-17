import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { NoticiaService } from '../services/noticias.service'


@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
//  providers: [NoticiaService]
})
export class SearchComponent implements OnInit {
  constructor(public noticias: NoticiaService) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
    this.noticias.agregar('Hola');
    this.noticias.agregar(' a ');
    this.noticias.agregar('todos');
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
