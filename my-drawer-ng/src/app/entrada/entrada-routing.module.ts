import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

//import { HomeComponent } from './home.component'
import { DescComponent } from './desc.component'
import { FotosComponent } from './fotos.component'

const routes: Routes = [
//    { path: '', redirectTo: '/foto', pathMatch: 'full' },    
    { path: '', component: FotosComponent },
    { path: 'desc', component: DescComponent }
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class EntradaRoutingModule {}
