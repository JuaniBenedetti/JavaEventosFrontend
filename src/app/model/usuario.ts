import { RolUsuario } from "./rolUsuario";

export class Usuario {
    idUsuario: number;
    username: string;
    password: string;
    email: string;
    activo: boolean;
    roles: RolUsuario[];
}