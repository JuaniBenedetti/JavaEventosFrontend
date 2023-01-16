import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './Authentication/authentication.guard';
import { SalasComponent } from "./Components/salas/salas.component";
import { SalonComponent } from './Components/salon/salon.component';
import { ServiciosFormComponent } from './Components/servicios/servicios-form/servicios-form.component';
import { ServiciosComponent } from './Components/servicios/servicios.component';
import { TipoServicioComponent } from './Components/tipo-servicio/tipo-servicio.component';
import { EventosComponent } from "./Components/eventos/eventos.component";
import { EventoFormComponent } from "./Components/eventos/evento-form/evento-form.component";
import { RouteGuardService } from "./Services/route-guard.service";

const routes: Routes = [
  { path:'salas', component: SalasComponent, canActivate:[AuthenticationGuard] },
  { path:'salon/:id',component:SalonComponent, canActivate:[AuthenticationGuard] },
  { path:'servicios',component:ServiciosComponent, canActivate:[AuthenticationGuard] },
  { path:'servicios/:id',component:ServiciosComponent, canActivate:[AuthenticationGuard] },
  { path:'serviciosForm', component:ServiciosFormComponent, canActivate:[AuthenticationGuard] },
  { path:'tipoServicio', component:TipoServicioComponent, canActivate:[AuthenticationGuard] },
  { path:'tipoServicioForm', component:TipoServicioComponent, canActivate:[AuthenticationGuard], canLoad:[AuthenticationGuard] },
  { path:'eventos', component:EventosComponent, canActivate:[RouteGuardService] },
  { path:'eventoForm', component:EventoFormComponent, canActivate:[RouteGuardService] },
  // { path: '**', component: SalasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
