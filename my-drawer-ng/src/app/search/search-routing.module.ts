import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SearchComponent } from './search.component'
import { DetalleComponent } from './dettalle.component'

const routes: Routes = [{ path: '', component: SearchComponent },
{ path: 'detalle', component: DetalleComponent }
]


@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SearchRoutingModule {}
