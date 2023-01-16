import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { BasicJWTAuthServicesService } from "../../Services/basic-jwtauth-services.service";
import { Router } from "@angular/router";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginDialog: DynamicDialogRef;

  isUserLoggedIn: boolean = false;
  items: MenuItem[] = [];

  constructor(
    private router: Router,
    private _basicJwtAuthServices: BasicJWTAuthServicesService,
    private _dialogService: DialogService
    ) { }

  ngOnInit() {
    this.logIn();
  }

  logIn(){
    this.loginDialog = this._dialogService.open(LoginComponent, {
      header: 'Ingresar',
      width: '18rem',
    });

    this.loginDialog.onClose.subscribe(isUserLoggedIn => {
      if (isUserLoggedIn) {
        this.isUserLoggedIn = isUserLoggedIn
        this.showMenu(true);
      } else {
        this.isUserLoggedIn = false
        this.showMenu(false);
      }
    });
  }

  logOut() {
    this._basicJwtAuthServices.logout();
    this.isUserLoggedIn = false;
    this.showMenu(false);
    this.router.navigate(['']);
  }

  showMenu(b: Boolean) {
    if (b) {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home'
      },
      {
        label: 'Eventos',
        items: [
          { label: 'Ver eventos', icon:'pi pi-list', routerLink: 'eventos' },
          { label: 'Nuevo evento', icon:'pi pi-plus-circle',routerLink: 'eventoForm' }
          ]
      },
      {
      label: 'Salones',
      items: [

        { label: 'Ver salones', icon:'pi pi-list', routerLink:'salas' },
        { label: 'Nuevo salón', icon:'pi pi-plus-circle', routerLink: ['/salon',0] }
        ]
      },
      {
        label: 'Servicios',
        items: [
          { label: 'Ver servicios', icon:'pi pi-list', routerLink:['/servicios'] },
          { label: 'Nuevo servicio', icon:'pi pi-plus-circle', routerLink:['/serviciosForm'] },
        ]
      },
      {
        label: 'Tipos de servicio',
        items: [
          { label: 'Ver tipos', icon:'pi pi-list', routerLink:['/tipoServicio'] },
          { label: 'Nuevo tipo', icon:'pi pi-plus-circle', routerLink:['/tipoServicioForm'] }
          ]
      }
    ];
    } else {
      this.items = [];
    }
  }
}
