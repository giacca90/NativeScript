import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'
import * as dialogs from "@nativescript/core/ui/dialogs";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule as NgRxStoreModule } from "@ngrx/store";
import {
  intializeNoticiasState,
  NoticiasEffects,
  NoticiasState,
  reducersNoticias
} from "./services/noticias-state.model";

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { EditComponent} from './editar-comp.component'
import { MenuService} from './services/menu.service'
import { NoticiasService } from './services/noticias.service'

// redux init
// tslint:disable-next-line:interface-name
export interface AppState {
  noticias: NoticiasState;
}

const reducers: ActionReducerMap<AppState> = {
  noticias: reducersNoticias
};

const reducersInitialState = {
  noticias: intializeNoticiasState()
};
// fin redux init


@NgModule({
  bootstrap: [AppComponent],
  imports: [AppRoutingModule, 
            NativeScriptModule, 
            NativeScriptUISideDrawerModule,
            NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
            EffectsModule.forRoot( [NoticiasEffects] )          
          ],
  declarations: [AppComponent, EditComponent],
  providers: [MenuService, NoticiasService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
