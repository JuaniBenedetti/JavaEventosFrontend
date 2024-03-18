import { Cliente } from "../cliente";
import { Usuario } from "../usuario";

export class UsuarioClienteDTO {
    usuario: Usuario;
    cliente: Cliente;

    constructor(usuario: Usuario, cliente: Cliente) {
        this.usuario = usuario;
        this.cliente = cliente;
    }
}