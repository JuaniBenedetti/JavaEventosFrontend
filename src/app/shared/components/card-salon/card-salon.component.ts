import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Salon } from 'src/app/model/salon';

@Component({
  selector: 'app-card-salon',
  templateUrl: './card-salon.component.html',
  styleUrls: ['./card-salon.component.scss'],
})
export class CardSalonComponent implements OnInit {

  @Input() salon: Salon;
  @Input() modoEdicion: Boolean;

  @Output() emitSeleccionarSalon: EventEmitter<Salon> = new EventEmitter();
  @Output() emitEditarSalon: EventEmitter<Salon> = new EventEmitter();
  @Output() emitEliminarSalon: EventEmitter<Salon> = new EventEmitter();

  constructor(
    public platform: Platform
  ) { }

  ngOnInit() {}

  seleccionarSalon(salon: Salon){
    this.emitSeleccionarSalon.emit(salon);
  }
  
  editarSalon(salon: Salon){
    this.emitEditarSalon.emit(salon);
  }

  eliminarSalon(salon: Salon){
    this.emitEliminarSalon.emit(salon);
  }
}
