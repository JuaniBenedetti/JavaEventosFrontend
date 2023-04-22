import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Servicio } from 'src/app/model/servicio';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { SnackInfoService } from 'src/app/services/snack-info/snack-info.service';
import { DialogConfirmacionComponent } from 'src/app/shared/components/dialog-confirmacion/dialog-confirmacion.component';
import { DialogServicioComponent } from 'src/app/shared/components/dialog-servicio/dialog-servicio.component';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  servicios: MatTableDataSource<Servicio>;
  columnasIncluidas: string[] = ["idServicio", "denominacion", "costoPorDia", "tipoServicio", "edicion"];

  constructor(
    public dialog: MatDialog,
    private location: Location,
    private _servicioService: ServicioService,
    private _snackInfo: SnackInfoService
  ) { }

  ngOnInit() {
    this.cargarData();
  }

  cargarData(): void {
    this._servicioService.findAll().subscribe((servicios: Servicio[]) => {
      this.servicios = new MatTableDataSource(servicios);
      this.paginator._intl.itemsPerPageLabel="Elementos por página"; // Edito string del paginador
      this.servicios.paginator = this.paginator;
      this.servicios.sort = this.sort;
    });
  }

  guardarServicio(modo: string, servicio?: Servicio): void {
    const dialogRef = this.dialog.open(DialogServicioComponent, {
      data: {servicio, modo}
    });
    dialogRef.afterClosed().subscribe(v => {v ? this.cargarData() : null});
  }

  eliminarServicio(servicio: Servicio): void {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: {
        title: "Eliminar servicio",
        message: `¿Desea eliminar el servicio "${servicio.denominacion}"?`,
        btnPri: "Eliminar",
        btnSec: "Cancelar"
      }
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this._servicioService.delete(servicio.idServicio).subscribe({
          next: (resp) => {
            this.snackBar('ok', 'Servicio eliminado con éxito');
            this.cargarData();
          },
          error: (error) => {this.snackBar('error', 'El Servicio no pudo ser eliminado');}
        });
      };
    });
  }

  busquedaFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.servicios.filter = filterValue.trim().toLowerCase();

    if (this.servicios.paginator) {
      this.servicios.paginator.firstPage();
    }
  }

  volver(): void {
    this.location.back();
  }

  snackBar(status: string, message: string) {
    this._snackInfo.show(status, message);
  }
}
