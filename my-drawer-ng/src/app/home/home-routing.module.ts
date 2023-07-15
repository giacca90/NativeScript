import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { HomeComponent } from './home.component'
import { EntradaModule } from '../entrada/entrada.module'
import { FotosComponent } from '../entrada/fotos.component'
import { DescComponent} from '../entrada/desc.component'

const routes: Routes = [
  { path: '', component: HomeComponent}
//  { path: '', loadChildren: () => import('~/app/entrada/entrada.module').then((m) => m.EntradaModule),}
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class HomeRoutingModule {}
