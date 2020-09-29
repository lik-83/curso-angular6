import { DestinoViaje } from './destino-viaje.model';
import { Store } from '@ngrx/store';
import { NuevoDestinoAction, ElegidoFavoritoAction } from './destinos-viajes-state.model';
import { AppState, APP_CONFIG, AppConfig, db } from '../app.module';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViaje[];

  constructor(private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient) {
      this.store
      .select(state => state.destinos)
      .subscribe((data) => {
        this.destinos = data.items;
      });
  }

  getById(id: String): DestinoViaje {
    return this.destinos.filter(function(d) { return d.id.toString() === id; })[0];
  }

  add(d: DestinoViaje) {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoDestinoAction(d));
        const myDb = db;
        myDb.destinos.add(d);
        myDb.destinos.toArray().then(destinos => console.log(destinos))
      }
    });
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  elegir(d: DestinoViaje) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

}