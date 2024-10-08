import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Salon } from 'src/app/model/salon';
import { Select, Store } from '@ngxs/store';
import { Platform } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { Servicio } from 'src/app/model/servicio';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { map, Observable, startWith, throwIfEmpty } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { SnackInfoService } from 'src/app/services/snack-info/snack-info.service';
import { Router } from '@angular/router';
import { ClearSalon, SalonState } from 'src/app/model/state/salonState';
import { ProgressBarState } from 'src/app/model/state/progressBarState';


export interface ServiciosPorTipo {
  tipoServicio: TipoServicio;
  servicios: Servicio[];
} 

@Component({
  selector: 'app-alquilar-salon',
  templateUrl: './alquilar-salon.page.html',
  styleUrls: ['./alquilar-salon.page.scss'],
})
export class AlquilarSalonPage implements OnInit {

  @Select(ProgressBarState.getPeticionesPendientes) peticionesPendientes$: Observable<boolean>;

  reserva: FormGroup;
  
  salon?: Salon;
  servicios: Servicio[];
  serviciosPorTipo: ServiciosPorTipo[] = [];
  fechasReservadas: Date[];

  // Chip
  serviciosChip: Servicio[] = [];

  // Autocomplete
  serviciosPorTipoOptions: Observable<ServiciosPorTipo[]>;
  servicioForm: FormControl = new FormControl();

  total: number = 0;

  constructor(
    private _servicio: ServicioService,
    private _reserva: ReservaService,
    private _formBuilder: FormBuilder,
    private _snackInfo: SnackInfoService,
    private router: Router,
    private location: Location,
    private store: Store,
    public platform: Platform,
  ) { }

  ngOnInit() {
    this._servicio.findAll().subscribe(servicios => {
      this.servicios = servicios;
      this.setServiciosPorTipo(servicios);
    });

    this.salon = this.store.selectSnapshot(SalonState.getSalon);

    if(this.salon) {
      this._reserva.findFechasReservadas(this.salon).subscribe(fechasReservadas => {
        this.fechasReservadas = fechasReservadas;
    });
      this.total = this.salon.costoPorDia;
    }

    this.reserva = this._formBuilder.group({
      nroReserva: [],
      fechaReserva: [new Date(), Validators.required],
      fechaEvento: [null, Validators.required],
      cantidadPersonas: [null, [Validators.required, Validators.max(this.salon?.capacidad || 0)]],
      salon: [null, Validators.required],
      servicios: [[]]
    });

    this.reserva.get('salon')?.setValue(this.salon);
    
    // Autocomplete
    this.serviciosPorTipoOptions = this.servicioForm.valueChanges.pipe(
      startWith(null),
      map(denominacion => typeof denominacion === "string" ? this._filterGroup(denominacion || '') : this.serviciosPorTipo),
    );
  }

  reservar(): void {
    if(this.reserva.valid) {
      this._reserva.save(this.reserva.value).subscribe({
        next: (resp) => {
          this.snackBar('ok', 'Reserva registrada con éxito');
          this.router.navigate(['home']);
        },
        error: (error) => {this.snackBar('error', 'La reserva no pudo ser registrada');}
      });
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.serviciosChip.push(event.option.value);
    this.serviciosPorTipo = this.serviciosPorTipo
      .map(spt => ({
        tipoServicio: spt.tipoServicio,
        servicios: spt.servicios.filter(s => s.idServicio != event.option.value.idServicio)
      }))
      .filter(spt => spt.servicios.length > 0);
    this.total += event.option.value.costoPorDia;
    this.reserva.get('servicios')?.setValue(this.serviciosChip);
    this.servicioForm.setValue(null);
  }

  remove(servicio: Servicio): void {
    let index = this.serviciosChip.indexOf(servicio)
    if (index != -1) {
      this.setServiciosPorTipo(this.serviciosChip.splice(index, 1));
    }
    this.total -= servicio.costoPorDia;
    this.reserva.get('servicios')?.setValue(this.serviciosChip);
  }

  serviciosToString(): string[] {
    return this.reserva.get('servicios')?.value.map((s: Servicio) => s.denominacion).join(', ');
  }

  volver(): void {
   this.location.back(); 
  }

  ionViewDidLeave() {
    this.store.dispatch(new ClearSalon());
  }

  // Devuelve false para cada fecha del calendario que coincida con alguna de las fechas del arreglo fechasReservadas
  filtroReservas = (d: Date | null): boolean => {
    const day = (d || new Date());
    return this.fechasReservadas?.every(fecha => new Date(fecha).toDateString() != day.toDateString());
  };

  private _filterGroup(denominacion: string): ServiciosPorTipo[] {
    if (denominacion) {
      return this.serviciosPorTipo
        .map(spt => ({
          tipoServicio: spt.tipoServicio, 
          servicios: this._filterServicio(spt.servicios, denominacion)
        }))
        .filter(spt => spt.servicios.length > 0);
    }
    return this.serviciosPorTipo;
  }

  private _filterServicio(servicios: Servicio[], denominacion: string): Servicio[] {
    return servicios.filter(s => s.denominacion.toLowerCase().includes(denominacion.toLowerCase()));
  }

  snackBar(status: string, message: string) {
    this._snackInfo.show(status, message);
  }

  // Agrupa los servicios por tipoServicio en un arreglo creado para tal fin.
  // Esto permite mostrar los servicios agrupados en el mat autocomplete.
  // No me gusta esta solución pero cambiar el backend, que es lo que considero correcto, me llevaría mucho más tiempo.
  setServiciosPorTipo(servicios: Servicio[]) {
    servicios.forEach(s => {
      let servicioPorTipo = this.serviciosPorTipo.find(spt => spt.tipoServicio.idTipoServicio == s.tipoServicio.idTipoServicio)
      if(servicioPorTipo) {
        servicioPorTipo.servicios.push(s);
      } else {
        this.serviciosPorTipo.push({
          tipoServicio: s.tipoServicio,
          servicios: [s]
        })
      }
    });
  }
}
