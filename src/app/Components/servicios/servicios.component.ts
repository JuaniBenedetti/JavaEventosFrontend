import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MessageService } from 'primeng/api';
import { Servicio } from 'src/app/model/servicio';
import { ServicioService } from 'src/app/Services/servicios.service';
import { TipoServicioService } from 'src/app/Services/tipo-servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  tiposDeServicios: String[] = [];
  servicioSinModificar: Servicio = new Servicio();

  constructor(
    private router : Router,
    private _messageService: MessageService,
    private _servicioService : ServicioService,
    private _tipoServicioService: TipoServicioService,
    ) { }

  ngOnInit() {
    this._servicioService.findAll().subscribe(serviciosBack => {
      this.servicios = serviciosBack;
    })

    this._tipoServicioService.findAll().subscribe(tipos => {
      this.tiposDeServicios = tipos.map(tipo => { return tipo.denominacion});
    });
  }

  editar(servicio: Servicio) {
    this.servicioSinModificar = {...servicio};
  }

  eliminar(servicio: Servicio) {
    this.servicioSinModificar = servicio;
    this._messageService.clear();
    this._messageService.add({ key: 'confirmar-c', sticky: true, severity:'warn', summary:'Desea eliminar el servicio?', detail:'Confirma para proceder' });
  }

  guardar(servicio: Servicio) {
    if (servicio.denominacion != "" && servicio.costoPorDia != null) {
      this._servicioService.update(servicio).subscribe(servicioBackend =>
        this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Servicio actualizado correctamente' })
      );
    } else {
      this._messageService.clear();
      this._messageService.add({ key: 'atencion', severity:'warn', summary: 'Atención', detail: 'Debe ingresar todos los campos requeridos' });
    }
  }

  nuevoServicio() {
    this.router.navigateByUrl('/serviciosForm');
  }

  cancelar(servicio: Servicio, indiceFila: number) {
    this.servicios[indiceFila] = this.servicioSinModificar;
  }

  volver() {
    this.router.navigate(['salas']);
  }

  aceptarMsj() {
    this._servicioService.delete(this.servicioSinModificar.idServicio).subscribe(value => {
      this.servicios.splice(this.servicios.indexOf(this.servicioSinModificar), 1);
      this._messageService.clear();
      this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Servicio eliminado correctamente' })
    });
  }

  cancelarMsj() {
    this._messageService.clear();
  }
}
