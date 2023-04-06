import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  @Output() abrirMenu: EventEmitter<void> = new EventEmitter();

  usuarioAutenticado: boolean = false;

  constructor(
    private _iniciarSesion: IniciarSesionService,
    private router: Router
  ) { }

  ngOnInit() {
    this._iniciarSesion.usuarioAutenticado().subscribe(autenticado =>
      this.usuarioAutenticado = autenticado
    )
  }

  cerrarSesion(): void {
    this._iniciarSesion.cerrarSesion();
    this.router.navigate(['landing']);
  }
}
