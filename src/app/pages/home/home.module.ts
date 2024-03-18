import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { CustomComponentsModule } from 'src/app/shared/modules/custom-components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MaterialModule,
    CustomComponentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
