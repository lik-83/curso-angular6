import { DestinoViaje } from './destino-viaje.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { NuevoDestinoAction, ElegidoFavoritoAction } from './destinos-viajes-state.model';
import { AppState } from '../app.module';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinosApiClient {
  destinos:DestinoViaje[];
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);
  
  constructor(private store: Store<AppState>) {
    this.destinos = [];

    this.store.select(state => state.destinos)
      .subscribe(data => {
        this.destinos = data.items;
      });
  }

  add(d:DestinoViaje){
    this.store.dispatch(new NuevoDestinoAction(d));
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  getById(id: String): DestinoViaje {
    return this.destinos.filter(function(d){ return d.id.toString() === id; })[0];
  }

  elegir(d: DestinoViaje) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

  subscribeOnChange(fn: any) {
    this.current.subscribe(fn);
  }

}