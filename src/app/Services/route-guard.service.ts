import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {BasicJWTAuthServicesService} from "./basic-jwtauth-services.service";


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private hardcodedAuthenticationService: BasicJWTAuthServicesService,
              private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.hardcodedAuthenticationService.isUserLoggedIn())
      //console.log('Usuario valido para ingresar al welcome');
      return true;
    this.router.navigate(['login']);

    //console.log('Usuario no valido para ingresar al welcome');
    return false;

  }
}
