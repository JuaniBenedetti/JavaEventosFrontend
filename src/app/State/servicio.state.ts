import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Servicio } from "../model/servicio";
import {append, patch} from '@ngxs/store/operators';

export class AddServicios {
    static readonly type = '[Servicios] Add'
  
    constructor(public servicio: Servicio){
  
    }
}
export class AddServiciosForArray {
    static readonly type= '[ServiciosArray] Add'
    constructor(public servicios:Servicio[]){

    }
}

export interface ServicioStateModel{
    servicios : Servicio[];
}
const resumenServicioModel : ServicioStateModel = {
    servicios : [],
}

@State <ServicioStateModel>({
    name: 'servicios',
    defaults: resumenServicioModel
})
@Injectable()
export class ServicioState{
    /* @Action(AddServicios)
    Add(ctx: StateContext<ServicioStateModel>){ 
        ctx.setState(patch<ServicioStateModel> ({
            servicios: []
        }));
      } */
    @Action(AddServiciosForArray)
        setServicios(ctx: StateContext<ServicioStateModel>, action: AddServiciosForArray){
            ctx.setState({servicios:action.servicios})
    }
    @Action(AddServicios)
        addZebra(ctx: StateContext<ServicioStateModel>, action: AddServicios) {
          ctx.setState(
            patch<ServicioStateModel>({
              servicios: append<Servicio>([action.servicio])
            })
          );
    }
    @Selector()
    static getServicios(state: ServicioStateModel) {
        return state.servicios;
    }
}
