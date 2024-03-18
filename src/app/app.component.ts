import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ClearPeticiones, ProgressBarState } from './model/state/progressBarState';
import { IniciarSesionService } from './services/iniciar-sesion/iniciar-sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  usuarioAutenticado: boolean = false;  

  constructor(
    private router: Router,
    private store: Store,
    private _iniciarSesion: IniciarSesionService
  ) {}

  ngOnInit() {
    this.store.dispatch(new ClearPeticiones());
    this._iniciarSesion.usuarioAutenticado().subscribe(autenticado =>
      this.usuarioAutenticado = autenticado
    )
  }
  
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
