import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, Page, platformNames } from '@nativescript/core'

@Component({
  selector: 'Desc',
  templateUrl: './desc.component.html',
})
export class DescComponent implements OnInit {
  ico: string = '';
  constructor() {
    // Use the component constructor to inject providers.
    if (platformNames.android) {
      this.ico = 'a'
    }
    if (platformNames.ios)  {
      this.ico = 'i'
    }
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
