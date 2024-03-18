import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-activacion',
  templateUrl: './input-activacion.component.html',
  styleUrls: ['./input-activacion.component.scss'],
})
export class InputActivacionComponent implements OnInit {

  subscriptions: Subscription[] = [];

  @Output() emitCodigoActivacion: EventEmitter<string> = new EventEmitter();

  inputActivacion: FormGroup;

  inputArray: string[] = ["primero", "segundo", "tercero", "cuarto", "quinto", "sexto"];

  constructor(
    public platform: Platform,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.inputActivacion = this._formBuilder.group({
      primero: ['', Validators.required],
      segundo: ['', Validators.required],
      tercero: ['', Validators.required],
      cuarto: ['', Validators.required],
      quinto: ['', Validators.required],
      sexto:['', Validators.required]
    });
  }

  onInput(event: Event) {
    // Obtengo el elemento HTML que disparó el evento.
    const input = event.target as HTMLInputElement;

    // Obtengo el arreglo de controles del formulario (solo las propiedades).
    // ["primero", "segundo", ...]
    const controls = Object.keys(this.inputActivacion.controls);

    let posicion: number = controls.indexOf(input.id);

    input.value == "" ? posicion-- : posicion++;

    document.getElementById(controls[posicion])?.focus();

    let value = "";
    controls.forEach(key => value += this.inputActivacion.get(key)?.value);
    this.emitCodigoActivacion.emit(value);
  }
}
