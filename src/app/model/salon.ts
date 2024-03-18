import { Administrativo } from "./administrativo";

export class Salon {
    idSalon: number;
    denominacion: string;
    capacidad: number;
    calleDireccion: string;
    numeroDireccion: string;
    descripcion: string;
    costoPorDia: number;
    nombreImagen: string;
    propietario: Administrativo;
}
