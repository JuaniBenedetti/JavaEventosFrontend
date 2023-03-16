import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Salon } from 'src/app/model/salon';

@Component({
  selector: 'app-card-salon',
  templateUrl: './card-salon.component.html',
  styleUrls: ['./card-salon.component.scss'],
})
export class CardSalonComponent implements OnInit {

  @Input() salon: Salon;

  constructor(
    public platform: Platform
  ) { }

  ngOnInit() {}

  seleccionarSalon(salon: Salon){

  }
}
