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
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  onPool(args) {
    const pullRefresh = args.object;
    setTimeout(function () {
//      this.noticias.agregar('xxxxxx');
       pullRefresh.refreshing = false;
    }, 1000);
  }
}
