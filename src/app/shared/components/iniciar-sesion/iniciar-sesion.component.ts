import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss'],
})
export class IniciarSesionComponent  implements OnInit {

  @Output() crearCuenta: EventEmitter<void> = new EventEmitter();
  @Output() sesionIniciada: EventEmitter<boolean> = new EventEmitter();

  datosUsuario: FormGroup;

  mostrarClave: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _iniciarSesion: IniciarSesionService
  ) { }

  ngOnInit() {
    this.datosUsuario = this._formBuilder.group({
      nombreUsuario: ['', {validators: [Validators.required], updateOn: 'submit'}],
      claveUsuario: ['', {validators: [Validators.required], updateOn: 'submit'}]
    });
  }

  iniciarSesion(): void {
    let username: string = this.datosUsuario.controls['nombreUsuario'].value;
    let password: string = this.datosUsuario.controls['claveUsuario'].value;
    this._iniciarSesion.iniciarSesion(username, password);
    this._iniciarSesion.usuarioAutenticado().subscribe(autenticado => 
      autenticado ? this.sesionIniciada.emit(true) : this.sesionIniciada.emit(false)
    );
  }
}
