import { TipoDocumento } from "./enums/tipoDocumento";

export class Persona {
    idPersona: number;
    tipoDocumento: TipoDocumento;
    nroDocumento: string;
    apellido: string;
    nombre: string;
    fechaNacimiento: Date;
    telefono: string;
}