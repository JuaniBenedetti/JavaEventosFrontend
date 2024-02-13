import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Output() navigateTo: EventEmitter<string> = new EventEmitter();
  @Output() closeMenu: EventEmitter<void> = new EventEmitter();

  esUsuarioAdministrador: boolean;

  constructor(
    private _iniciarSesion: IniciarSesionService
  ) { }

  ngOnInit() {
    this.esUsuarioAdministrador = this._iniciarSesion.esUsuarioAdministrador();
  }

}
