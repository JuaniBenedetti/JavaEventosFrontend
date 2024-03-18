import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CustomComponentsModule } from 'src/app/shared/modules/custom-components.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LandingPageRoutingModule,
    MaterialModule,
    CustomComponentsModule
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}
