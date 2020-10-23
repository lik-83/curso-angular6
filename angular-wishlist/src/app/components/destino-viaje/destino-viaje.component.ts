import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { AppState } from '../../app.module';
import { Store } from '@ngrx/store';
import { VoteUpAction, VoteDownAction, DestinoBorrarAction } from '../../models/destinos-viajes-state.model';
import { trigger, style, transition, animate, state } from '@angular/animations';


@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('3s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ]),
    ])
  ]
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino : DestinoViaje;
  @Input("idx") position : number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() onClicked : EventEmitter<DestinoViaje>;
  
  constructor(private store:Store<AppState>) { 
    this.onClicked = new EventEmitter(); 
  }

  ngOnInit() {
  }

  ir() {
    this.onClicked.emit(this.destino);
    return false;
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }

  borrar() {
    this.store.dispatch(new DestinoBorrarAction(this.destino));
    return false;
  }
}
