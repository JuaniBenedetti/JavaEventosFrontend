import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Servicio } from 'src/app/model/servicio';
import { ProgressBarState } from 'src/app/model/state/progressBarState';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { SnackInfoService } from 'src/app/services/snack-info/snack-info.service';
import { TipoServicioService } from 'src/app/services/tipo-servicio/tipo-servicio.service';
import {Observable } from 'rxjs';

// Se utiliza para mapear el ingreso de datos del dialog
export interface DialogServicioComponentData {
  servicio: Servicio;
}

@Component({
  selector: 'app-dialog-servicio',
  templateUrl: './dialog-servicio.component.html',
  styleUrls: ['./dialog-servicio.component.scss'],
})
export class DialogServicioComponent  implements OnInit {

  @Select(ProgressBarState.getPeticionesPendientes) peticionesPendientes$: Observable<boolean>;

  datosServicio: FormGroup;

  tipos: TipoServicio[];

  textoBoton: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogServicioComponentData,
    public matDialogRef: MatDialogRef<DialogServicioComponent>,
    private _formBuilder: FormBuilder,
    private _tipoServicio: TipoServicioService,
    private _servicio: ServicioService,
    private _snackInfo: SnackInfoService
  ) { }

  ngOnInit() {
    this.datosServicio = this._formBuilder.group({
      idServicio: [null],
      denominacion: ['', {validators: [Validators.required], updateOn: 'submit'}],
      costoPorDia: ['', {validators: [Validators.required], updateOn: 'submit'}],
      tipoServicio: ['', {validators: [Validators.required], updateOn: 'submit'}]
    });

    this._tipoServicio.findAll().subscribe(tipos => {
      this.tipos = tipos
      if(this.data.servicio) {
        this.datosServicio.patchValue(this.data.servicio);
      }
    });    
  }

  guardarServicio(): void {
    if(this.datosServicio.dirty) {
      let servicio = this.data.servicio;
      // Si pase un servicio el objetivo es editar
      if(servicio) {
        servicio = this.datosServicio.value;
        this._servicio.update(servicio).subscribe({
          next: (resp) => {this.snackBar('ok', 'Servicio actualizado con éxito');},
          error: (error) => {this.snackBar('error', 'El Servicio no pudo ser actualizado');}
        });
      // Si no hay servicio entonces guardo uno nuevo
      } else {
        servicio = this.datosServicio.value;
        this._servicio.save(servicio).subscribe({
          next: (resp) => {this.snackBar('ok', 'Servicio creado con éxito');},
          error: (error) => {this.snackBar('error', 'El Servicio no pudo ser creado');}
        });
      }
    }
    this.matDialogRef.close(this.datosServicio.dirty);
  }

  matSelectComparar(obj1: TipoServicio, obj2: TipoServicio): boolean {
    return obj1 && obj2 && obj1.idTipoServicio == obj2.idTipoServicio;
  }

  snackBar(status: string, message: string) {
    this._snackInfo.show(status, message);
  }
}
