import { Salon } from "./salon";
import { Servicio } from "./servicio";

export class Reserva {
    nroReserva: number;
    fechaReserva: Date;
    fechaEvento: Date;
    cantidadPersonas: number;
    salon: Salon;
    servicios: Servicio[];
    costoTotal: number;
}