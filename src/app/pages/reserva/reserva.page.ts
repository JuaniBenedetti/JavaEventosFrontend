import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reserva } from 'src/app/model/reserva';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { SnackInfoService } from 'src/app/services/snack-info/snack-info.service';
import { Location } from '@angular/common';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from 'src/app/shared/components/dialog-confirmacion/dialog-confirmacion.component';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  reservas: MatTableDataSource<Reserva>;
  columnasIncluidas: string[] = ["nroReserva", "cliente", "fechaReserva", "fechaEvento", "salon", "cantidadPersonas", "servicios", "costoTotal", "edicion"];

  esUsuarioAdministrador: boolean;

  constructor(
    public dialog: MatDialog,
    private location: Location,
    private _reservaService: ReservaService,
    private _iniciarSesion: IniciarSesionService,
    private _snackInfo: SnackInfoService
  ) { }

  ngOnInit() {
    this.cargarData();
    this.esUsuarioAdministrador = this._iniciarSesion.esUsuarioAdministrador();
    this.esUsuarioAdministrador ? null : this.columnasIncluidas.splice(1,1);
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
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: {
        title: "Cancelar reserva",
        message: `¿Desea cancelar la reserva N° ${reserva.nroReserva}?`,
        btnPri: "Eliminar",
        btnSec: "Cancelar"
      }
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this._reservaService.delete(reserva.nroReserva).subscribe({
          next: (resp) => {
            this.snackBar('ok', 'Reserva cancelada con éxito');
            this.cargarData();
          },
          error: (error) => {this.snackBar('error', 'La reserva no pudo ser cancelara');}
        });
      };
    });
  }

  volver(): void {
    this.location.back();
  }

  snackBar(status: string, message: string) {
    this._snackInfo.show(status, message);
  }
}
