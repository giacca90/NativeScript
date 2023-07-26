import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, TextField } from '@nativescript/core'
import * as appSettings from "tns-core-modules/application-settings";
import { RouterExtensions } from '@nativescript/angular'

@Component({
  selector: 'Add',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {
  texto: string = "";
  constructor(private routerExtensions: RouterExtensions) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  cambios(args) {
    // returnPress event will be triggered when user submits a value
    let textField = args.object as TextField
    this.texto = textField.text
}

  add()  {
    appSettings.setString("nombreUsuario", this.texto);
    this.routerExtensions.navigate(["settings"], {
      transition: {
        name: 'fade',
      },
    })
  }
}
