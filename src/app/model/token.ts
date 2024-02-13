import { Rol } from "./enums/rol";

export class Token {
    exp: number;
    sub: string;
    roles: Rol[];
}