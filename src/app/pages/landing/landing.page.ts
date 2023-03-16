import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  datosUsuario: FormGroup;
  datosPersonales: FormGroup;

  indiceTab = 0;

  tiposDoc: String[] = [
    'DNI',
    'LC',
    'LE',
  ];

  constructor(
    private _formBuilder: FormBuilder,
    public platform: Platform
    ) { }

  ngOnInit() {
    this.datosUsuario = this._formBuilder.group({
      emailUsuario: [''],
      nombreUsuario: [''],
      claveUsuario: ['']
    });

    this.datosPersonales = this._formBuilder.group({
      apellido: [''],
      nombre: [''],
      tipoDoc: ['DNI'],
      nroDoc:[''],
      fechaNac:[''],
      telefono:['']
    });
  }
}
