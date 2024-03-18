import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoServicioPage } from './tipo-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: TipoServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoServicioPageRoutingModule {}
