import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Evento} from "../model/evento";
import { Servicio } from '../model/servicio';

export class AddEvento {
  static readonly type = '[EVENTO] Add'

  constructor(public evento: Evento) {
  }
}



export class EventoStateModel {
   public eventos: Evento = new Evento;
   /* salones : Salon[] = [];
   servicios : Servicio[] = []; */
}
const resumenEventosModel :  EventoStateModel = {
   eventos: new Evento
  /* salones : [],
   servicios : [], */
};

@State<EventoStateModel>({
  name:'eventos',
  defaults: resumenEventosModel
})

export class EventosState {

  @Selector()
  static getEventos(state: EventoStateModel){
    return state.eventos;
  }

  /* @Action(AddEvento)
  add({getState, patchState}: StateContext<EventoStateModel>, {evento}:AddEvento){
    const state = getState();
    patchState({
      eventos:[...state.eventos, evento]
    })
  } */
  @Action(AddEvento)
    setEventoAction(ctx: StateContext<EventoStateModel>, action: AddEvento) {
        ctx.patchState({eventos: action.evento});
    }

 
}
