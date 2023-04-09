import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servicio } from 'src/app/model/servicio';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { TipoServicioService } from 'src/app/services/tipo-servicio/tipo-servicio.service';

// Se utiliza para mapear el ingreso de datos del dialog
export interface DialogData {
  servicio: Servicio;
  modo: string;
}

@Component({
  selector: 'app-dialog-servicio',
  templateUrl: './dialog-servicio.component.html',
  styleUrls: ['./dialog-servicio.component.scss'],
})
export class DialogServicioComponent  implements OnInit {

  datosServicio: FormGroup;

  tipos: TipoServicio[];

  textoBoton: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private _tipoServicio: TipoServicioService,
    private _servicio: ServicioService
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

    this.data.modo == 'Nuevo' ?
      this.textoBoton = 'Crear' :
      this.textoBoton = 'Guardar';
  }

  guardarServicio(): void {
    if(this.data.servicio) {
      this.data.servicio = this.datosServicio.value;
      this._servicio.update(this.data.servicio).subscribe();
    } else {
      let createServicio: Servicio = new Servicio();
      createServicio = this.datosServicio.value;
      this._servicio.save(createServicio).subscribe();
    }
  }

  matSelectComparar(obj1: TipoServicio, obj2: TipoServicio): boolean {
    return obj1 && obj2 && obj1.idTipoServicio == obj2.idTipoServicio;
  }
}
