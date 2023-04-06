import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Salon } from 'src/app/model/salon';
import { SalonService } from 'src/app/services/salon/salon.service';
import { DialogSalonComponent } from 'src/app/shared/components/dialog-salon/dialog-salon.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  salones: Salon[];
  salonesFiltrados: Salon[];

  ordenamientos: String[] = [
    "Nombre",
    "Costo por dia",
    "Capacidad"
  ];

  constructor(
    public dialog: MatDialog,
    private _salonService: SalonService
    ) { }

  ngOnInit(): void {
    this._salonService.findAll().subscribe(salones => {
      this.salones = salones;
      this.salonesFiltrados = [...salones];
    });
  }

  busquedaFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.salonesFiltrados = this.salones.filter((salon) => {
      return salon.denominacion.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  ordenarSalones(orden: String, tipo: boolean): void {
    let o = tipo == true ? -1 : 1;
    switch(orden?.toLowerCase()) {
      case("nombre"): this.salonesFiltrados.sort((a, b) => (a.denominacion > b.denominacion) ? o : -o); break;
      case("costo por dia"): this.salonesFiltrados.sort((a, b) => (a.costoPorDia > b.costoPorDia) ? o : -o); break;
      case("capacidad"): this.salonesFiltrados.sort((a, b) => (a.capacidad > b.capacidad) ? o : -o); break;
      default: this.salonesFiltrados = [...this.salones];
    }
  }

  confirmacionSalon(salon: Salon): void {
    const dialogRef = this.dialog.open(DialogSalonComponent, {
      data: salon
    });
  }

}
