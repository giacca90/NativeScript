import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

//import { EntradaRoutingModule } from './home-routing.module'
import { EntradaRoutingModule } from './entrada-routing.module'
//import { HomeComponent } from './home.component'
import { DescComponent } from './desc.component'
import { FotosComponent } from './fotos.component'


@NgModule({
  imports: [NativeScriptCommonModule, EntradaRoutingModule,],
  declarations: [DescComponent, FotosComponent ],
  schemas: [NO_ERRORS_SCHEMA],
  
})
export class EntradaModule {}
