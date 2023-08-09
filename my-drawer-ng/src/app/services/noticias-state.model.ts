import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { NoticiasService } from "./noticias.service";

// ESTADO
export class Noticia {
  constructor(public titulo: string) {}
}

export class Favoritos {
  constructor(public nombre: string) {}
}

// tslint:disable-next-line:interface-name
export interface NoticiasState {
  // tslint:disable-next-line:array-type
  items: Noticia[];
  sugerida: Noticia;
}

export interface FavoritosState {
  items: Favoritos[];
}

export function intializeNoticiasState() {
  return {
    items: [],
    sugerida: null,
  };
}

export function initializeFavoritosStrate() {
//  const noticias = new NoticiasService
  return {
    items: []
  }
}
// ACCIONES
export enum NoticiasActionTypes {
  INIT_MY_DATA = "[Noticias] Init My Data",
  NUEVA_NOTICIA = "[Noticias] Nueva",
  SUGERIR_NOTICIA = "[Noticias] Sugerir",
}

export enum FavoritosActionType {
  INICIO = "[Favoritos] Inicio",
  FAVORITA = "[Favoritos] Favorita",
  DESVAVORITA = "[Favoritos] Desfavorita"
}

// tslint:disable-next-line:max-classes-per-file
export class InitMyDataAction implements Action {
  type = NoticiasActionTypes.INIT_MY_DATA;
  constructor(public titulares: string[]) {}
}

export class IniciaFavoritosAction implements Action {
  type = FavoritosActionType.INICIO;
  constructor(public favoritos: string[]) {}
}

// tslint:disable-next-line:max-classes-per-file
export class NuevaNoticiaAction implements Action {
  type = NoticiasActionTypes.NUEVA_NOTICIA;
  constructor(public noticia: Noticia) {}
}

export class FavoritaAction implements Action {
  type = FavoritosActionType.FAVORITA;
  constructor(public favorita: Favoritos) {}
}

// tslint:disable-next-line:max-classes-per-file
export class SugerirAction implements Action {
  type = NoticiasActionTypes.SUGERIR_NOTICIA;
  constructor(public noticia: Noticia) {}
}

export class DesfavoritaAction implements Action {
  type = FavoritosActionType.DESVAVORITA;
  constructor(public favorita: Favoritos) {}
}

export type NoticiasViajesActions = NuevaNoticiaAction | InitMyDataAction;

export type FavoritosAction = IniciaFavoritosAction | FavoritaAction | DesfavoritaAction;

// REDUCERS
export function reducersNoticias(
  state: NoticiasState,
  action: NoticiasViajesActions
): NoticiasState {
  switch (action.type) {
    case NoticiasActionTypes.INIT_MY_DATA: {
      const titulares: string[] = (action as InitMyDataAction).titulares;

      return {
        ...state,
        items: titulares.map((t) => new Noticia(t)),
      };
    }
    case NoticiasActionTypes.NUEVA_NOTICIA: {
      return {
        ...state,
        items: [...state.items, (action as NuevaNoticiaAction).noticia],
      };
    }
    case NoticiasActionTypes.SUGERIR_NOTICIA: {
      return {
        ...state,
        sugerida: (action as SugerirAction).noticia,
      };
    }
  }

  return state;
}

export function reducersFavoritos(
  state: FavoritosState,
  action: FavoritosAction
): FavoritosState {

  switch (action.type) {
    case FavoritosActionType.INICIO: {
      const favoritos: string[] = (action as IniciaFavoritosAction).favoritos;

      return {
        ...state,
        items: favoritos.map((t) => new Favoritos(t)),
      };
    }
    case FavoritosActionType.FAVORITA: {
    
      return {
        ...state,
        items: [...state.items, (action as FavoritaAction).favorita],
      };
    }
    case FavoritosActionType.DESVAVORITA: {

      return {
        ...state,
        items: [...state.items.filter(del => del !== (action as DesfavoritaAction).favorita)]
      };
    }
  }

  return state;
}


// EFFECTS
// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class NoticiasEffects {
  
  result$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NoticiasActionTypes.NUEVA_NOTICIA),
      map((action: NuevaNoticiaAction) => new SugerirAction(action.noticia))
    );
  });

  constructor(private actions$: Actions) {}
}
