import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Salon } from "../salon";

export class SalonStateModel {
    salon: Salon | undefined;
}
  
export class SetSalon {
    static readonly type = '[Salon] set salon';
    constructor(public salon: Salon) {}
}

export class ClearSalon {
    static readonly type = '[Salon] clear salon';
    constructor() {}
}

const salonStateDefault: SalonStateModel = { salon: undefined };

@State<SalonStateModel>({
    name: 'salon',
    defaults: salonStateDefault
})
@Injectable()
export class SalonState{

    @Action(SetSalon)
    setSalon(ctx: StateContext<SalonStateModel>, { salon }: SetSalon) {
      ctx.patchState({ salon });
    }

    @Action(ClearSalon)
    clearSalon(ctx: StateContext<SalonStateModel>) {
      ctx.setState(salonStateDefault);
    }

    @Selector()
    static getSalon(state: SalonStateModel): Salon | undefined {
        return state.salon;
    }   
}