import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmacion-email',
  templateUrl: './dialog-confirmacion-email.component.html',
  styleUrls: ['./dialog-confirmacion-email.component.scss'],
})
export class DialogConfirmacionEmailComponent  implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public email: string
  ) { }

  ngOnInit() {}

}
