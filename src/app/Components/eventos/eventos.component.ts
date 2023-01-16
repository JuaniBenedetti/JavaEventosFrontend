import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { EventoServicesService } from 'src/app/Services/evento-services.service';
import {Servicio} from "../../model/servicio";
import {MessageService} from "primeng/api";
import {ServicioService} from "../../Services/servicios.service";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {

  mostrarButtonAgregar = false;

  eventoSinModificar: Evento = new Evento();

  message: String = '' +
    '';
  eventos : Evento[] = [];
  servicios: String[]=[];
  selectedServicios: Servicio[]=[];

  constructor(private route:ActivatedRoute,
              private service:EventoServicesService,
              private _messageService: MessageService,
              private _eventoService: EventoServicesService,
              private _servicioService: ServicioService,
  ) {

  }

  ngOnInit(): void {
    this.listar();
    this._servicioService.findAll().subscribe((servicioBackend) => {
      this.servicios = servicioBackend.map(value => value.denominacion);
    })

  }
  listar(){
    this.service.getDataEventos().subscribe(
      (response: any) =>{
        this.eventos = response;
        this.message = response.message;}
    );
    // this.selectedServicios = this.eventos.map(evento=>evento.servicios);
  }

  editar(evento: Evento) {
    this.mostrarButtonAgregar = true;
    this.eventoSinModificar = {...evento};
  }

  eliminar(evento: Evento) {
    this.eventoSinModificar = evento;
    this._messageService.clear();
    this._messageService.add({ key: 'confirmar-c', sticky: true, severity:'warn', summary:'Desea eliminar el servicio?', detail:'Confirma para proceder' });
  }

  guardar(evento: Evento) {
    this.mostrarButtonAgregar = false;
    if (evento.salon.denominacion != '' &&
        evento.cliente.apellido != '' &&
        evento.cantidadPersonas !== 0)
    {
      this._eventoService.updateEventos(evento).subscribe((eventoBackend) => {
          console.log("evento del backend",eventoBackend);
          this._messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Evento del dia ${eventoBackend.fechaEvento} actualizado correctamente`
          });
        },(error)=>{
          this._messageService.add({  key: 'atencion', severity:'warn', summary: 'Atención', detail: `${error.error.message}` }
          );
        });
      //this.listar();
    } else {
          this._messageService.clear();
          this._messageService.add({  key: 'atencion', severity:'warn', summary: 'Atención', detail: 'Debe ingresar todos los campos requeridos' });
    }
  }

  cancelar(evento: Evento, indiceFila: number) {
    this.mostrarButtonAgregar = false;
    this.eventos[indiceFila] = this.eventoSinModificar;
  }

  eliminarServicio(evento: Evento, i : number) {
    evento.servicios.splice(i,1);
  }

  agregarServicio(evento: Evento) {
    evento.servicios.push(new Servicio());
  }

  aceptarMsj() {
    this._eventoService.deleteEventos(this.eventoSinModificar.nroReserva).subscribe(value => {
      this.eventos.splice(this.eventos.indexOf(this.eventoSinModificar), 1);
      this._messageService.clear();
      this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Servicio eliminado correctamente' })
    });
  }

  cancelarMsj() {
    this._messageService.clear();
  }
}
