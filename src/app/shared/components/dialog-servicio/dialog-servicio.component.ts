import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servicio } from 'src/app/model/servicio';
import { TipoServicio } from 'src/app/model/tipoServicio';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private _tipoServicio: TipoServicioService
  ) { }

  ngOnInit() {
    this.datosServicio = this._formBuilder.group({
      denominacion: ['', {validators: [Validators.required], updateOn: 'submit'}],
      costoPorDia: ['', {validators: [Validators.required], updateOn: 'submit'}],
      tipoServicio: [{validators: [Validators.required], updateOn: 'submit'}]
    });
    this._tipoServicio.findAll().subscribe(tipos => this.tipos = tipos);    
  }

  guardarServicio(): void {
    console.log("CORRECTOOOO");
  }
}
