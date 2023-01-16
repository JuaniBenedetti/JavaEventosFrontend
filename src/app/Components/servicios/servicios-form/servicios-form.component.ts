import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Servicio } from 'src/app/model/servicio';
import { TipoServicio } from 'src/app/model/tiposervicio';
import { ServicioService } from 'src/app/Services/servicios.service';
import { TipoServicioService } from 'src/app/Services/tipo-servicio.service';

@Component({
  selector: 'app-servicios-form',
  templateUrl: './servicios-form.component.html',
  styleUrls: ['./servicios-form.component.css'],
})
export class ServiciosFormComponent implements OnInit {
  
  id: number = 0;
  tiposDeServicios: TipoServicio[] = [];

  servicioForm = new FormGroup({ denominacion: new FormControl(), costoPorDia: new FormControl(), tipoServicio: new FormControl() });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _servicioService: ServicioService,
    private _tipoServicioService: TipoServicioService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this._tipoServicioService.findAll().subscribe(
      tipos => this.tiposDeServicios = tipos
    );

    this.servicioForm = this.formBuilder.group({
      denominacion: [,Validators.required],
      costoPorDia: [,Validators.required],
      tipoServicio: [,Validators.required]
    });

  }

  guardarServicio() {
    if(this.servicioForm.valid) {
      let servicio = new Servicio();
      servicio = Object.assign(servicio, this.servicioForm.value);
      this._servicioService.saveServicio(servicio).subscribe(servicioBack => {
        this.mensajeExitoso();
        this.router.navigateByUrl('/servicios');
      });
    }
    else { this.mensajeError(); }
  }

  cancelar() {
    this._location.back();
  }

  mensajeExitoso() {
    this._messageService.clear();
    this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Servicio creado correctamente' });
  }

  mensajeError() {
    this._messageService.clear();
    this._messageService.add({ severity:'error', summary: 'Error', detail: 'El servicio no pudo ser creado' });
  }

}
