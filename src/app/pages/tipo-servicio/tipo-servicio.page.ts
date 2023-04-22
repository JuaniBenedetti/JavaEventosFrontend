import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { SnackInfoService } from 'src/app/services/snack-info/snack-info.service';
import { TipoServicioService } from 'src/app/services/tipo-servicio/tipo-servicio.service';
import { DialogConfirmacionComponent } from 'src/app/shared/components/dialog-confirmacion/dialog-confirmacion.component';
import { DialogTipoServicioComponent } from 'src/app/shared/components/dialog-tipo-servicio/dialog-tipo-servicio.component';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.page.html',
  styleUrls: ['./tipo-servicio.page.scss'],
})
export class TipoServicioPage implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tiposServicio: MatTableDataSource<TipoServicio>;
  columnasIncluidas: string[] = ["idTipoServicio", "denominacion", "edicion"];

  constructor(
    public dialog: MatDialog,
    private location: Location,
    private _tipoServicioService: TipoServicioService,
    private _snackInfo: SnackInfoService
  ) { }

  ngOnInit() {
    this.cargarData();
  }

  cargarData(): void {
    this._tipoServicioService.findAll().subscribe((tiposServicio: TipoServicio[]) => {
      this.tiposServicio = new MatTableDataSource(tiposServicio);
      this.paginator._intl.itemsPerPageLabel="Elementos por página"; // Edito string del paginador
      this.tiposServicio.paginator = this.paginator;
      this.tiposServicio.sort = this.sort;
    });
  }

  guardarTipoServicio(modo: string, tipoServicio?: TipoServicio): void {
    const dialogRef = this.dialog.open(DialogTipoServicioComponent, {
      data: {tipoServicio, modo}
    });
    dialogRef.afterClosed().subscribe(v => {v ? this.cargarData() : null});
  }

  eliminarTipoServicio(tipoServicio: TipoServicio): void {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: {
        title: "Eliminar tipo de servicio",
        message: `¿Desea eliminar el tipo "${tipoServicio.denominacion}"?`,
        btnPri: "Eliminar",
        btnSec: "Cancelar"
      }
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this._tipoServicioService.delete(tipoServicio.idTipoServicio).subscribe({
          next: (resp) => {
            this.snackBar('ok', 'Tipo de servicio eliminado con éxito');
            this.cargarData();
          },
          error: (error) => {this.snackBar('error', 'El tipo de servicio no pudo ser eliminado');}
        });
      };
    });
  }

  busquedaFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tiposServicio.filter = filterValue.trim().toLowerCase();

    if (this.tiposServicio.paginator) {
      this.tiposServicio.paginator.firstPage();
    }
  }

  volver(): void {
    this.location.back();
  }

  snackBar(status: string, message: string) {
    this._snackInfo.show(status, message);
  }
}
