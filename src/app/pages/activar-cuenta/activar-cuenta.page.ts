import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { ProgressBarState } from 'src/app/model/state/progressBarState';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';
import {Observable } from 'rxjs';

@Component({
  selector: 'app-activar-cuenta',
  templateUrl: './activar-cuenta.page.html',
  styleUrls: ['./activar-cuenta.page.scss'],
})
export class ActivarCuentaPage implements OnInit {

  @Select(ProgressBarState.getPeticionesPendientes) peticionesPendientes$: Observable<boolean>;

  activacionForm: FormGroup;

  constructor(
    private _iniciarSesion: IniciarSesionService,
    private _formBuilder: FormBuilder,
    private router: Router,
    public platform: Platform,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.activacionForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      codigo: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  activarCuenta() {
    let email: string = this.activacionForm.get('email')?.value;
    let codigo: string = this.activacionForm.get('codigo')?.value;
    this._iniciarSesion.activarCuenta(email, codigo).subscribe({
      next: (res) => {
        this._iniciarSesion.snackBar('ok', "Cuenta activada con éxito");
        this.router.navigate(['/landing']);
      },
      error: (error: HttpErrorResponse) => {this._iniciarSesion.snackBar('error', error.error);}
    });;
  }

  setCodigoActivacionForm(event: string) {
    this.activacionForm.get('codigo')?.setValue(event);
  }

  volver() {
    this.router.navigate(['/landing']);
  }
}
