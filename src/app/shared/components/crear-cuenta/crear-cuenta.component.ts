import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Cliente } from 'src/app/model/cliente';
import { UsuarioClienteDTO } from 'src/app/model/dto/usuarioClienteDTO';
import { TipoDocumento } from 'src/app/model/enums/tipoDocumento';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';
import { DialogConfirmacionEmailComponent } from '../dialog-confirmacion-email/dialog-confirmacion-email.component';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss'],
})
export class CrearCuentaComponent  implements OnInit {

  @Output() iniciarSesion: EventEmitter<void> = new EventEmitter();

  datosUsuario: FormGroup;
  datosPersonales: FormGroup;

  mostrarClave: boolean = true;
  maxDate: Date = new Date();

  tiposDoc: String[] = [
    'DNI',
    'LC',
    'LE',
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _iniciarSesion: IniciarSesionService,
    private router: Router,
    public platform: Platform,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.datosUsuario = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.datosPersonales = this._formBuilder.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      tipoDoc: ['DNI'],
      nroDoc:['', [Validators.required, Validators.minLength(8)]],
      fechaNac: ['', Validators.required],
      telefono:['', [Validators.required, Validators.minLength(10)]]
    });

    // Me subscribo a los cambios de tipoDoc para cambiar el validador de la longitud minima necesaria del nroDoc.
    this.datosPersonales.get('tipoDoc')?.valueChanges.subscribe((value) => {
      this.datosPersonales.get('nroDoc')?.setValidators([
        Validators.required,
        Validators.minLength(value == 'LC' ? 7 : 8)
      ]);
    });
  }

  registrar() {
    let usuario = this.datosUsuario.value;
    let cliente = this.formularioToCliente();
    let usuarioClienteDTO = new UsuarioClienteDTO(usuario, cliente);
    this._iniciarSesion.registrarUsuarioCliente(usuarioClienteDTO).subscribe();
  }

  activar() {
    let email: string = this.datosUsuario.get('email')?.value;
    let codigo: string = this.datosUsuario.get('codigo')?.value;
    console.log(codigo);
    this._iniciarSesion.activarCuenta(email, codigo).subscribe({
      next: (res) => {
        this._iniciarSesion.snackBar('ok', "Cuenta activada con éxito");
        this.router.navigate(['/landing']);
      },
      error: (error: HttpErrorResponse) => {this._iniciarSesion.snackBar('error', error.error);}
    });;
  }

  confirmarEmail(stepper: MatStepper): void {
    const dialogRef = this.dialog.open(DialogConfirmacionEmailComponent, {
      width: '400px',
      data: this.datosUsuario.get('email')?.value
    });
    dialogRef.afterClosed().subscribe((value) => {
      value ? stepper.next() : this.datosUsuario.controls['email'].setValue('')
    });
  }

  formularioToCliente(): Cliente {
    let cliente = new Cliente();
    cliente.apellido = this.datosPersonales.get('apellido')?.value;
    cliente.nombre = this.datosPersonales.get('nombre')?.value;
    cliente.tipoDocumento = this.datosPersonales.get('tipoDoc')?.value as TipoDocumento;
    cliente.nroDocumento = this.datosPersonales.get('nroDoc')?.value;
    cliente.fechaNacimiento = this.datosPersonales.get('fechaNac')?.value;
    cliente.telefono = this.datosPersonales.get('telefono')?.value;
    return cliente;
  }

  ngxMaskNroDoc(): string {
    switch(this.datosPersonales.controls['tipoDoc'].value) {
      case('LE'): return "U0000000";
      case('LC'): return "0000000";
      default: return "00000000";
    }
  }
}
