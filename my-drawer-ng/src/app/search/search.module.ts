import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import { NoticiasService } from '../services/noticias.service'
import { DetalleComponent } from './dettalle.component'
import { ListadoComponent } from './listado.component'
import { SearchFormComponent } from'./search-form.component'
import { MinLenDirective} from './validator'
import { DialogContent } from './editar-detalle.component'
import { FavoritosComponent } from './favoritos.component'

@NgModule({
  imports: [NativeScriptCommonModule, SearchRoutingModule, NativeScriptFormsModule],
  declarations: [SearchComponent, DetalleComponent, ListadoComponent, FavoritosComponent, SearchFormComponent, MinLenDirective, DialogContent ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
