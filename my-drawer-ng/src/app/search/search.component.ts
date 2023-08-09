import { Component, OnInit } from '@angular/core'
import { RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { RouterExtensions } from '@nativescript/angular'
import { NavigationEnd, Router } from '@angular/router'

import { NoticiasService } from '../services/noticias.service'
import { ToastDuration, Toasty } from '@triniwiz/nativescript-toasty';
import { filter } from 'rxjs'

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
//  providers: [NoticiasService]
})
export class SearchComponent implements OnInit {
  resultados: string[];
  private _sideDrawerTransition: SlideInOnTopTransition
  private _activatedUrl: string
  constructor(//private noticias: NoticiasService,
    private routerExtensions: RouterExtensions,
    private router: Router) {
    // Use the component constructor to inject providers.
    
  }

  ngOnInit(): void {
    // Init your component properties here.
    this._activatedUrl = '/search'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects))
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

  verFavoritos ()  { 
//    console.log("-_-_-_-_-"+ this.noticias.favoritos)
    this.routerExtensions.navigate(["search/favoritos"], {
      transition: {
        name: 'fade',
      },
    })

    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.closeDrawer()
  }
 
}
