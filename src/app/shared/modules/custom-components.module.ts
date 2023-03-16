import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSalonComponent } from '../components/card-salon/card-salon.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from '../components/navbar/navbar.component';



@NgModule({
  declarations: [
    CardSalonComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule
  ],
  exports: [
    CardSalonComponent,
    NavbarComponent
  ]
})
export class CustomComponentsModule { }
