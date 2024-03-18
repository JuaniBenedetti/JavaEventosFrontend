import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProgressBarState } from 'src/app/model/state/progressBarState';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  @Input() usuarioAutenticado: boolean = false;
  @Output() abrirMenu: EventEmitter<void> = new EventEmitter();

  @Select(ProgressBarState.getPeticionesPendientes) peticionesPendientes$: Observable<boolean>;

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
