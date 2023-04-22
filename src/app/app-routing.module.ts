import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './security/guards/auth.guard';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'servicio',
    loadChildren: () => import('./pages/servicio/servicio.module').then( m => m.ServicioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tipoServicio',
    loadChildren: () => import('./pages/tipo-servicio/tipo-servicio.module').then( m => m.TipoServicioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reserva',
    loadChildren: () => import('./pages/reserva/reserva.module').then( m => m.ReservaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alquilar-salon',
    loadChildren: () => import('./pages/alquilar-salon/alquilar-salon.module').then( m => m.AlquilarSalonPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notFound',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule),
  },
  {
    path: 'login',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'notFound',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
