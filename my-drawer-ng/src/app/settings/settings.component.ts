import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular'
import * as appSettings from "@nativescript/core/application-settings";

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
})

export class SettingsComponent implements OnInit {
//  toastOptions: Toast.ToastOptions = {text: "Hello World", duration: Toast.DURATION.SHORT};
  nombreUsuario: string = appSettings.getString("nombreUsuario");
  constructor(private routerExtensions: RouterExtensions) {
    // Use the component constructor to inject providers.
    
  }

  doLater(fn) { setTimeout(fn, 1000); }

  ngOnInit(): void {
    // Init your component properties here.
    
//    this.doLater(() =>  Toast.show(this.toastOptions) )

  /*   this.doLater(() =>
            dialogs.action("Mensaje", "Cancelar!", ["Opcion1", "Opcion2"])
                    .then((result) => {
                                        console.log("resultado: " + result);
                                        if (result === "Opcion1") {
                                            this.doLater(() =>
                                                dialogs.alert({
                                                    title: "Titulo 1 ",
                                                    message: "mje 1",
                                                    okButtonText: "btn 1"
                                                }).then(()  => console.log("Cerrado 1!")));
                                        } else if (result === "Opcion2") {
                                            this.doLater(() =>
                                                dialogs.alert({
                                                    title: "Titulo 2",
                                                    message: "mje 2",
                                                    okButtonText: "btn 2"
                                                }).then(() => console.log("Cerrado 2!")));
                                        }
        }));
 */  

      
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade',
      },
    })
}
}
