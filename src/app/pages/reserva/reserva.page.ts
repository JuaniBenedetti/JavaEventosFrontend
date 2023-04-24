import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reserva } from 'src/app/model/reserva';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { SnackInfoService } from 'src/app/services/snack-info/snack-info.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  reservas: MatTableDataSource<Reserva>;
  columnasIncluidas: string[] = ["nroReserva", "fechaReserva", "fechaEvento", "salon", "cantidadPersonas", "servicios", "costoTotal", "edicion"];

  constructor(
    private location: Location,
    private _reservaService: ReservaService,
    private _snackInfo: SnackInfoService
  ) { }

  ngOnInit() {
    this.cargarData();
  }

  cargarData(): void {
    this._reservaService.findAll().subscribe((reservas: Reserva[]) => {
      this.reservas = new MatTableDataSource(reservas);
      this.paginator._intl.itemsPerPageLabel="Elementos por página"; // Edito string del paginador
      this.reservas.paginator = this.paginator;
      this.reservas.sort = this.sort;
    });
  }

  eliminarReserva(reserva: Reserva): void {

  }

  volver(): void {
    this.location.back();
  }

  snackBar(status: string, message: string) {
    this._snackInfo.show(status, message);
  }
}
