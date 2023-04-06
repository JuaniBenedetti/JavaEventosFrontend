import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private _iniciarSesion: IniciarSesionService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._iniciarSesion.usuarioAutenticado().getValue()) {
      return true;
    }
    else {
      this.router.navigate(["landing"]);
      return false;
    }
  }
}
