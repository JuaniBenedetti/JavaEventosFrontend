import {Evento} from "./evento";
import {Usuario} from "./usuario";

export class Cliente extends Usuario {
  eventos: Evento[] = [];
}
