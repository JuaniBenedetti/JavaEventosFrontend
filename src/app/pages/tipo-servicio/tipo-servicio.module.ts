import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoServicioPageRoutingModule } from './tipo-servicio-routing.module';

import { TipoServicioPage } from './tipo-servicio.page';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CustomComponentsModule } from 'src/app/shared/modules/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoServicioPageRoutingModule,
    MaterialModule,
    CustomComponentsModule
  ],
  declarations: [TipoServicioPage]
})
export class TipoServicioPageModule {}
