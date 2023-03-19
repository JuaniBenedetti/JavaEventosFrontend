import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSalonComponent } from '../components/card-salon/card-salon.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CrearCuentaComponent } from '../components/crear-cuenta/crear-cuenta.component';
import { IniciarSesionComponent } from '../components/iniciar-sesion/iniciar-sesion.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { InputActivacionComponent } from '../components/input-activacion/input-activacion.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';


export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    CardSalonComponent,
    NavbarComponent,
    CrearCuentaComponent,
    IniciarSesionComponent,
    InputActivacionComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule,
    IonicModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    CardSalonComponent,
    NavbarComponent,
    CrearCuentaComponent,
    IniciarSesionComponent,
    InputActivacionComponent
  ]
})
export class CustomComponentsModule { }
