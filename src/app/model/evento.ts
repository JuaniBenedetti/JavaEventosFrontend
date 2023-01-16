import {Salon} from "./salon";
import {Cliente} from "./cliente";
import {Servicio} from "./servicio";


export class Evento {
    nroReserva: number = 0 ;
    fechaReserva?: Date;
    fechaEvento?: Date ;
    cantidadPersonas: number = 0;
    salon : Salon = new Salon();
    cliente : Cliente = new Cliente();
    servicios: Servicio[] = [];

    constructor(){

    }

}
