import { Component } from '@angular/core';
import { BasicJWTAuthServicesService } from "../../Services/basic-jwtauth-services.service";
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(
    private basicAuthenticationServices: BasicJWTAuthServicesService,
    private _messageService: MessageService, 
    public loginDialog: DynamicDialogRef,
    ) { }

  handleJWTAuthLogin(){
    this.basicAuthenticationServices.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
          (data: any) => {
          this.loginDialog.close(true);
        },
        (error: any) => {
          this.mensajeError();
        }
      );
  }

  mensajeError() {
    this._messageService.clear();
    this._messageService.add({ severity:'error', summary: 'Error', detail: 'Usuario o Contraseña incorrecta' });
  }
}
