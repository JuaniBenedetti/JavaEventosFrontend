import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Salon } from 'src/app/model/salon';

@Component({
  selector: 'app-dialog-salon',
  templateUrl: './dialog-salon-info.component.html',
  styleUrls: ['./dialog-salon-info.component.scss'],
})
export class DialogSalonInfoComponent  implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {salon: Salon, edicion: boolean}
  ) { }

  ngOnInit() {}

}
