import { DestinoViaje } from './destino-viaje.model';
import { Store } from '@ngrx/store';
import { NuevoDestinoAction, ElegidoFavoritoAction } from './destinos-viajes-state.model';
import { AppState } from '../app.module';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinosApiClient {
  
  constructor(private store: Store<AppState>) {
  }

  add(d:DestinoViaje){
    this.store.dispatch(new NuevoDestinoAction(d));
  }

  elegir(d: DestinoViaje) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

}