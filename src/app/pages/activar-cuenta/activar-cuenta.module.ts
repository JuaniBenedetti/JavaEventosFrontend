import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivarCuentaPageRoutingModule } from './activar-cuenta-routing.module';

import { ActivarCuentaPage } from './activar-cuenta.page';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CustomComponentsModule } from 'src/app/shared/modules/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivarCuentaPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CustomComponentsModule
  ],
  declarations: [ActivarCuentaPage]
})
export class ActivarCuentaPageModule {}
