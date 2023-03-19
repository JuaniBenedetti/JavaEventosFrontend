import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss'],
})
export class IniciarSesionComponent  implements OnInit {

  @Output() crearCuenta: EventEmitter<void> = new EventEmitter();

  datosUsuario: FormGroup;

  mostrarClave: boolean = true;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.datosUsuario = this._formBuilder.group({
      nombreUsuario: ['', {validators: [Validators.required], updateOn: 'submit' }],
      claveUsuario: ['', {validators: [Validators.required], updateOn: 'submit' }]
    });
  }

  iniciarSesion(): void {
    
  }
}
