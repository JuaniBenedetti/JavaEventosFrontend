import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Evento} from "../../../model/evento"
import {Servicio} from "../../../model/servicio";
import {EventoServicesService} from "../../../Services/evento-services.service";
import {MessageService} from "primeng/api";
import {ServicioService} from "../../../Services/servicios.service";
import {Salon} from "../../../model/salon";
import {SalaService} from "../../../Services/sala.service";
import {ClientesService} from "../../../Services/clientes.service";
import {Cliente} from "../../../model/cliente";

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {


  eventos:Evento[]= [];
  evento: Evento = new Evento();

  servicios: Servicio[] = [];
  selectedServicios : Servicio[] = [];

  salones : Salon [] = [];
  selectedSalones: Salon [] = [];

  clientes : Cliente[]=[];

  constructor( 
    private service:EventoServicesService,
    private _messageService: MessageService,
    private _eventoService: EventoServicesService,
    private _servicioService: ServicioService,
    private _salonesService: SalaService,
    private _clienteService: ClientesService,
  ) { }

  ngOnInit(): void {
    this.service.getDataEventos().subscribe(
      (response: any) =>{
        this.eventos = response;
        }
    );
    this._servicioService.findAll().subscribe(
      (response: any)=>{
      this.servicios = response;
    })
    this._salonesService.getSalas().subscribe(
      (response : any)=>{
        this.salones = response;
      }
    )
    this._clienteService.getClientes().subscribe(
      (data:any)=>{
        this.clientes = data;
      }
    )
  }

  saveEvento() {
    if(this.evento.fechaEvento == null || this.evento.cantidadPersonas == 0 ||
      this.evento.salon == null || this.evento.cliente == null ){
      this._messageService.add({  key: 'atencion', severity:'warn', summary: 'Atención',
        detail: `Faltan ingresar datos` }
      );
    }

    this.evento.fechaReserva = new Date();
    this.evento.cantidadPersonas = Number(this.evento.cantidadPersonas);
    console.log('evento antes de insertar',this.evento);
    this._eventoService.insertEvento(this.evento).subscribe(
      (data)=>{console.log('Evento del backend',data)}
    );
    }




}
