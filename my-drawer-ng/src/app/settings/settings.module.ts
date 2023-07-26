import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { SettingsRoutingModule } from './settings-routing.module'
import { SettingsComponent } from './settings.component'
import { AddComponent } from './add.component'
@NgModule({
  imports: [NativeScriptCommonModule, SettingsRoutingModule],
  declarations: [SettingsComponent, AddComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsModule {}
