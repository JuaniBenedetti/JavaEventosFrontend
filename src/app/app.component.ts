import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IniciarSesionService } from './services/iniciar-sesion/iniciar-sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  usuarioAutenticado: boolean = false;  

  constructor(
    private router: Router,
    private _iniciarSesion: IniciarSesionService
  ) {}
  
  ngOnInit() {
    this._iniciarSesion.usuarioAutenticado().subscribe(autenticado =>
      this.usuarioAutenticado = autenticado
    )
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
