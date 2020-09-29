import { Component, OnInit, Injectable, Inject, forwardRef } from '@angular/core';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, AppConfig, APP_CONFIG } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

@Injectable()
class DestinosApiDecorated extends DestinosApiClient {
  constructor(store: Store<AppState>, @Inject(forwardRef(() => APP_CONFIG)) config: AppConfig, http: HttpClient) {
    super(store, config, http);
  }

  getById(id: string): DestinoViaje {
    console.log('llamando por la clase decorada!');
    return super.getById(id);
  }
}



class DestinosApiClientViejo {
  getById(id: string): DestinoViaje {
    console.log('llamando por la clase vieja!');
    return null;
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    {provide: DestinosApiClient, useClass: DestinosApiDecorated},
    {provide: DestinosApiClientViejo, useExisting: DestinosApiClient},
  ]
})
export class DestinoDetalleComponent implements OnInit {
  
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
