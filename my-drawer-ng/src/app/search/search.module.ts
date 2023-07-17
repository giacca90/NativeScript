import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import { NoticiaService } from '../services/noticias.service'
import { DetalleComponent } from './dettalle.component'
import { ListadoComponent } from './listado.component'

@NgModule({
  imports: [NativeScriptCommonModule, SearchRoutingModule],
  declarations: [SearchComponent, DetalleComponent, ListadoComponent],
  providers: [NoticiaService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
