import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { AppState } from '../../app.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [ DestinosApiClient ]
})
export class ListaDestinosComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViaje>
  updates: string[];
  all: DestinoViaje[];

  constructor(private destinosApiClient:DestinosApiClient,
    private store: Store<AppState>) { 

    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(data => {
        if (data != null) {
          this.updates.push("Se ha elegido a " + data.nombre);
        }
      });
    store.select(state => state.destinos.items)
      .subscribe(items => this.all = items);
  }

  ngOnInit() {
  }

  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(d : DestinoViaje) {
    this.destinosApiClient.elegir(d);
  }

}
