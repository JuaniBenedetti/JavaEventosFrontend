import { RolUsuario } from "./rolUsuario";


export class Token {
    exp: number;
    sub: string;
    roles: RolUsuario[];
}