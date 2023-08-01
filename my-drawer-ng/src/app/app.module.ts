import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'
import * as dialogs from "@nativescript/core/ui/dialogs";


import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { EditComponent} from './editar-comp.component'
import { MenuService} from './services/menu.service'
import { NoticiasService } from './services/noticias.service'

@NgModule({
  bootstrap: [AppComponent],
  imports: [AppRoutingModule, NativeScriptModule, NativeScriptUISideDrawerModule],
  declarations: [AppComponent, EditComponent],
  providers: [MenuService, NoticiasService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
