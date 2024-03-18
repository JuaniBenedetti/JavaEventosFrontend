import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { SnackInfoService } from 'src/app/services/snack-info/snack-info.service';
import { TipoServicioService } from 'src/app/services/tipo-servicio/tipo-servicio.service';


export interface DialogTipoServicioComponentData {
  tipoServicio: TipoServicio;
  modo: string;
}

@Component({
  selector: 'app-dialog-tipo-servicio',
  templateUrl: './dialog-tipo-servicio.component.html',
  styleUrls: ['./dialog-tipo-servicio.component.scss'],
})
export class DialogTipoServicioComponent  implements OnInit {

  datosTipoServicio: FormGroup;

  textoBoton: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogTipoServicioComponentData,
    public matDialogRef: MatDialogRef<DialogTipoServicioComponent>,
    private _formBuilder: FormBuilder,
    private _tipoServicio: TipoServicioService,
    private _snackInfo: SnackInfoService
  ) { }

  ngOnInit() {
    this.datosTipoServicio = this._formBuilder.group({
      idTipoServicio: [null],
      denominacion: ['', {validators: [Validators.required], updateOn: 'submit'}],
    });    

    if(this.data.tipoServicio) {
      this.datosTipoServicio.patchValue(this.data.tipoServicio);
    }

    this.data.modo == 'Nuevo' ?
      this.textoBoton = 'Crear' :
      this.textoBoton = 'Guardar';
  }

  guardarTipoServicio(): void {
    if(this.datosTipoServicio.dirty) {
      let tipoServicio = this.data.tipoServicio;
      // Si pase un servicio el objetivo es editar
      if(tipoServicio) {
        tipoServicio = this.datosTipoServicio.value;
        this._tipoServicio.update(tipoServicio).subscribe({
          next: (resp) => {this.snackBar('ok', 'Servicio actualizado con éxito');},
          error: (error) => {this.snackBar('error', 'El Servicio no pudo ser actualizado');}
        });
      // Si no hay servicio entonces guardo uno nuevo
      } else {
        tipoServicio = this.datosTipoServicio.value;
        this._tipoServicio.save(tipoServicio).subscribe({
          next: (resp) => {this.snackBar('ok', 'Servicio creado con éxito');},
          error: (error) => {this.snackBar('error', 'El Servicio no pudo ser creado');}
        });
      }
    }
    this.matDialogRef.close(this.datosTipoServicio.dirty);
  }

  snackBar(status: string, message: string) {
    this._snackInfo.show(status, message);
  }
}
