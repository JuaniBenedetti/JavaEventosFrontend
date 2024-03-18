import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogConfirmacionComponentData {
  title: string,
  message: string,
  btnPri: string,
  btnSec: string
}

@Component({
  selector: 'app-dialog-confirmacion',
  templateUrl: './dialog-confirmacion.component.html',
  styleUrls: ['./dialog-confirmacion.component.scss'],
})
export class DialogConfirmacionComponent  implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmacionComponentData,
    public dialogRef: MatDialogRef<DialogConfirmacionComponent>
  ) { }

  ngOnInit() {
    this.dialogRef.updateSize('400px');
  }

}
