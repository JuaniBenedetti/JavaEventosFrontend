import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Salon } from 'src/app/model/salon';

@Component({
  selector: 'app-dialog-salon',
  templateUrl: './dialog-salon.component.html',
  styleUrls: ['./dialog-salon.component.scss'],
})
export class DialogSalonComponent  implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {salon: Salon, modoEdicion: boolean}
  ) { }

  ngOnInit() {}

}
