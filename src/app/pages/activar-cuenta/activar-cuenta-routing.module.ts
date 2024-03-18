import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivarCuentaPage } from './activar-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: ActivarCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivarCuentaPageRoutingModule {}
