import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SettingsComponent } from './settings.component'
import { AddComponent } from './add.component'

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'add', component: AddComponent }
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SettingsRoutingModule {}
