import {TipoServicio} from "./tiposervicio";

export class Servicio {
    idServicio: number = 0;
    denominacion : string = '';
    costoPorDia: number = 0;
    tipoServicio : TipoServicio = new TipoServicio();

    constructor(){

    }
}
