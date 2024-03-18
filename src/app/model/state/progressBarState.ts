import { Action, Selector, State, StateContext } from "@ngxs/store";

export class ProgressBarStateModel {
    peticiones_pendientes: number;
}

const progressBarStateDefault: ProgressBarStateModel = { peticiones_pendientes: 0 };

export class SumarPeticion {
    static readonly type = '[void] Sumar peticion';
}

export class RestarPeticion {
    static readonly type = '[void] Restar peticion';
}

export class ClearPeticiones {
    static readonly type = '[number] clear peticiones_pendientes';
    constructor() {}
}

@State<ProgressBarStateModel>({
    name: 'progressBar',
    defaults: progressBarStateDefault
})
export class ProgressBarState {
    @Action(SumarPeticion)
    sumarPeticion(ctx: StateContext<ProgressBarStateModel>) {
        const state = ctx.getState();
        ctx.patchState({
            peticiones_pendientes: state.peticiones_pendientes + 1
        });
    }

    @Action(RestarPeticion)
    restarPeticion(ctx: StateContext<ProgressBarStateModel>) {
        const state = ctx.getState();
        ctx.patchState({
            peticiones_pendientes: Math.max(0, state.peticiones_pendientes - 1)
        });
    }

    @Action(ClearPeticiones)
    ClearPeticiones(ctx: StateContext<ProgressBarStateModel>) {
      ctx.setState(progressBarStateDefault);
    }

    @Selector()
    static getPeticionesPendientes(state: ProgressBarStateModel): boolean {
        return state.peticiones_pendientes > 0;
    }   
}