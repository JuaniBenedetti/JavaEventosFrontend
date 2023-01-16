import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TipoServicio } from 'src/app/model/tiposervicio';
import { TipoServicioService } from 'src/app/Services/tipo-servicio.service';

@Component({
  selector: 'app-tipo-servicio-form',
  templateUrl: './tipo-servicio-form.component.html',
  styleUrls: ['./tipo-servicio-form.component.css']
})
export class TipoServicioFormComponent {

  nuevoTipo: TipoServicio = new TipoServicio();

  constructor(
    private router: Router,
    private _tipoServicioService: TipoServicioService,
    public tipoServicioFormDialog: DynamicDialogRef,
  ) { }

  guardar() {
    if (this.nuevoTipo.denominacion != "") {
      this._tipoServicioService.saveTipoServicio(this.nuevoTipo).subscribe(x => {
        this.tipoServicioFormDialog.close();
      });
    }
  }

  cancelar() {
    this.tipoServicioFormDialog.close();
  }
}
