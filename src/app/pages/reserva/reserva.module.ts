import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaPageRoutingModule } from './reserva-routing.module';

import { ReservaPage } from './reserva.page';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CustomComponentsModule } from 'src/app/shared/modules/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaPageRoutingModule,
    MaterialModule,
    CustomComponentsModule
  ],
  declarations: [ReservaPage]
})
export class ReservaPageModule {}
