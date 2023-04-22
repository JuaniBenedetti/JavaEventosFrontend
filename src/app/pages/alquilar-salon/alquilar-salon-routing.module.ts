import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlquilarSalonPage } from './alquilar-salon.page';

const routes: Routes = [
  {
    path: '',
    component: AlquilarSalonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlquilarSalonPageRoutingModule {}
