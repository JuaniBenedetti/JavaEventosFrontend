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
import { DialogSalonInfoComponent } from '../components/dialog-salon-info/dialog-salon-info.component';
import { DialogConfirmacionEmailComponent } from '../components/dialog-confirmacion-email/dialog-confirmacion-email.component';
import { MenuComponent } from '../components/menu/menu.component';
import { DialogServicioComponent } from '../components/dialog-servicio/dialog-servicio.component';
import { DialogTipoServicioComponent } from '../components/dialog-tipo-servicio/dialog-tipo-servicio.component';
import { DialogConfirmacionComponent } from '../components/dialog-confirmacion/dialog-confirmacion.component';
import { DialogSalonComponent } from '../components/dialog-salon/dialog-salon.component';


export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    CardSalonComponent,
    NavbarComponent,
    CrearCuentaComponent,
    IniciarSesionComponent,
    InputActivacionComponent,
    DialogSalonComponent,
    DialogSalonInfoComponent,
    DialogConfirmacionEmailComponent,
    MenuComponent,
    DialogServicioComponent,
    DialogTipoServicioComponent,
    DialogConfirmacionComponent
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
    InputActivacionComponent,
    DialogSalonComponent,
    DialogSalonInfoComponent,
    DialogConfirmacionEmailComponent,
    MenuComponent,
    DialogServicioComponent,
    DialogTipoServicioComponent,
    DialogConfirmacionComponent
  ]
})
export class CustomComponentsModule { }
