import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas-detalle',
  templateUrl: './reservas-detalle.component.html',
  styleUrls: ['./reservas-detalle.component.css']
})
export class ReservasDetalleComponent implements OnInit {

  id: any;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit() {
  }

}
