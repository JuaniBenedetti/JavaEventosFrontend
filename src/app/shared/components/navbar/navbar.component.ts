import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  @Input() usuarioAutenticado: boolean = false;
  @Output() abrirMenu: EventEmitter<void> = new EventEmitter();

  constructor(
    private _iniciarSesion: IniciarSesionService,
    private router: Router
  ) { }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  cerrarSesion(): void {
    this._iniciarSesion.cerrarSesion();
    this.router.navigate(['landing']);
  }
}
