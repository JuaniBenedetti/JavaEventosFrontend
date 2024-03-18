import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Salon } from 'src/app/model/salon';
import { SalonService } from 'src/app/services/salon/salon.service';
import { SnackInfoService } from 'src/app/services/snack-info/snack-info.service';

// Se utiliza para mapear el ingreso de datos del dialog
export interface DialogSalonComponentData {
  salon: Salon;
}

@Component({
  selector: 'app-dialog-salon',
  templateUrl: './dialog-salon.component.html',
  styleUrls: ['./dialog-salon.component.scss'],
})
export class DialogSalonComponent  implements OnInit {

  datosSalon: FormGroup;

  textoBoton: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogSalonComponentData,
    public matDialogRef: MatDialogRef<DialogSalonComponent>,
    private _formBuilder: FormBuilder,
    private _salon: SalonService,
    private _snackInfo: SnackInfoService
  ) { }

  ngOnInit() {
    this.datosSalon = this._formBuilder.group({
      idSalon: [null],
      denominacion: ['', {validators: [Validators.required], updateOn: 'submit'}],
      capacidad: ['', {validators: [Validators.required], updateOn: 'submit'}],
      calleDireccion: ['', {validators: [Validators.required], updateOn: 'submit'}],
      numeroDireccion: ['', {validators: [Validators.required], updateOn: 'submit'}],
      descripcion: ['', {validators: [Validators.required], updateOn: 'submit'}],
      costoPorDia: ['', {validators: [Validators.required], updateOn: 'submit'}],
      nombreImagen: [null]
    });

    if(this.data.salon) {
      this.datosSalon.patchValue(this.data.salon);
    }
  }

  guardarSalon(): void {
    if(this.datosSalon.dirty) {
      let salon = this.data.salon;
      // Si pase un servicio el objetivo es editar
      if(salon) {
        salon = this.datosSalon.value;
        this._salon.update(salon).subscribe({
          next: (resp) => {this.snackBar('ok', 'Salón actualizado con éxito');},
          error: (error) => {this.snackBar('error', 'El salón no pudo ser actualizado');}
        });
      // Si no hay servicio entonces guardo uno nuevo
      } else {
        salon = this.datosSalon.value;
        this._salon.save(salon).subscribe({
          next: (resp) => {this.snackBar('ok', 'Salón creado con éxito');},
          error: (error) => {this.snackBar('error', 'El salón no pudo ser creado');}
        });
      }
    }
    this.matDialogRef.close(this.datosSalon.dirty);
  }

  snackBar(status: string, message: string) {
    this._snackInfo.show(status, message);
  }
}
