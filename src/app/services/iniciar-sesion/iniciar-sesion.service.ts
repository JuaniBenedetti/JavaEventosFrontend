import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioClienteDTO } from 'src/app/model/dto/usuarioClienteDTO';
import { Rol } from 'src/app/model/enums/rol';
import { Token } from 'src/app/model/token';
import { Usuario } from 'src/app/model/usuario';
import { environment } from 'src/environments/environment';
import { SnackInfoService } from '../snack-info/snack-info.service';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

  tokenExists = new BehaviorSubject<boolean>(this.tokenValido());

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private _snackInfo: SnackInfoService
  ) { }

  iniciarSesion(username: string, password: string) {
    this.http.post(
      environment.backendURL + 'login', 
      {"username": username,"password": password},
      {observe: 'response'}
    ).subscribe({
      next: (res) => {
        this.setToken(res.headers.get('Authorization') || "")
      },
      error: (error) => {this.snackBar('error', 'Credenciales erróneas o cuenta inactiva');}
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem("token");
    this.tokenExists.next(false);
  }

  registrarUsuarioCliente(usuarioClienteDTO: UsuarioClienteDTO): Observable<Usuario> {
    return this.http.post<Usuario>(environment.backendURL +  'register', usuarioClienteDTO);
  }

  activarCuenta(email: string, codigo: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.appendAll({"email": email, "codigo": codigo});
    return this.http.post<string>(environment.backendURL + 'enable', null, {params: httpParams});
  }

  usuarioAutenticado(): BehaviorSubject<boolean> {
    return this.tokenExists;
  }

  // Busca los rolUsuario del JWT y devuelve una lista de ENUM Rol
  getRolesUsuario(): Rol[] {
    let roles: Rol[] = [];
    this.jwtHelper.decodeToken<Token>(localStorage.getItem('token') || "")?.roles.forEach((r: Rol) => {
      roles.push(Rol[r]);
    });
    return roles;
  }

  esUsuarioAdministrador(): boolean {
    let rolesUsuario: Rol[] = this.getRolesUsuario();
    return rolesUsuario.includes(Rol.ROLE_OWNER) || rolesUsuario.includes(Rol.ROLE_ADMIN);
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

  snackBar(status: string, message: string) {
    this._snackInfo.show(status, message);
  }
}
