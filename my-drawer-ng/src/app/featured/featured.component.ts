import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, Color, View } from '@nativescript/core'

@Component({
  selector: 'Featured',
  templateUrl: './featured.component.html',
})
export class FeaturedComponent implements OnInit {
  @ViewChild("layout") layout: ElementRef;
 
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

  prueba()  {
    const layout = <View>this.layout.nativeElement;
    layout.animate({
      backgroundColor: new Color('blue'),
      duration: 1500,
      delay: 750
    }).then(() => layout.animate({
      backgroundColor: new Color('white'),
      duration: 1500,
      delay: 750
    }))
  }

  prueba2()  {
    const layout = <View>this.layout.nativeElement;
    layout.animate({
      rotate: 360,
      duration: 1500,
      delay: 750
    }).then(() => layout.animate({
      rotate: -360,
      duration: 1500,
      delay: 750
    }))
  }

  prueba3()  {
    const layout = <View>this.layout.nativeElement;
    layout.animate({
      scale: {x:2, y:2},
      duration: 1500,
      delay: 750
    }).then(() => layout.animate({
      scale: {x:1, y:1},
      duration: 1500,
      delay: 750
    }).then(() => layout.animate({
      scale: {x:0.5, y:0.5},
      duration: 1500,
      delay: 750
    }).then(() => layout.animate({
      scale: {x:1, y:1},
      duration: 1500,
      delay: 750
    }))
    )
    )
  }
}
