import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

  tokenExists = new BehaviorSubject<boolean>(this.tokenValido());

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService  
  ) { }

  iniciarSesion(username: string, password: string) {
    this.http.post(
      "http://localhost:8080/login", 
      {"username": username,"password": password},
      {observe: 'response'}
    ).subscribe(res => this.setToken(res.headers.get('Authorization') || ""));
  }

  cerrarSesion(): void {
    localStorage.removeItem("token");
    this.tokenExists.next(false);
  }

  usuarioAutenticado(): BehaviorSubject<boolean> {
    return this.tokenExists;
  }

  getRolesUsuario() {
    console.log(this.jwtHelper.decodeToken(localStorage.getItem('token') || ""));
  }

  setToken(token: string): void {
    if (token != "") {
      localStorage.setItem('token', token);
      this.tokenExists.next(true);
    }
    else {
      this.tokenExists.next(false);
    }
  }

  tokenValido(): boolean {
    let token = localStorage.getItem("token");
    if (token != null && token != "") {
      return true;
    }
    return false;
  }
}
