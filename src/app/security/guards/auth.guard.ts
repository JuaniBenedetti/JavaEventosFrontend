import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/model/enums/rol';
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
      if (this.verificaRol(route.data)) {
        return true
      }
      this.router.navigate(["home"]);
      return false;
    }
    else {
      this.router.navigate(["landing"]);
      return false;
    }
  }

  verificaRol(data: Data): Boolean {
    let rolesUsuario: Rol[] = this._iniciarSesion.getRolesUsuario();
    // Condiciones: ¿la pagina exige rol? y ¿el usuario no tiene rol admin?.
    if (data['roles'] && !rolesUsuario.includes(Rol.ROLE_ADMIN)) {
      console.log(rolesUsuario.find(rolUsuario => data['roles'].includes(rolUsuario)) != undefined);
      return rolesUsuario.find(rolUsuario => data['roles'].includes(rolUsuario)) != undefined;
    }
    return true;
  }
}
