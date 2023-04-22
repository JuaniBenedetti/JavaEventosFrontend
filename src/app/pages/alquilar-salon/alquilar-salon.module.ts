import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AlquilarSalonPageRoutingModule } from './alquilar-salon-routing.module';

import { AlquilarSalonPage } from './alquilar-salon.page';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CustomComponentsModule } from 'src/app/shared/modules/custom-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AlquilarSalonPageRoutingModule,
    MaterialModule,
    CustomComponentsModule,
    ReactiveFormsModule,
    NgxMaskModule
  ],
  declarations: [AlquilarSalonPage]
})
export class AlquilarSalonPageModule {}
