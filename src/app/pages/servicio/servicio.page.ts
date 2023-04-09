import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Servicio } from 'src/app/model/servicio';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
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
    private _servicioService: ServicioService
  ) { }

  ngOnInit() {
    this._servicioService.findAll().subscribe((servicios: Servicio[]) => {
      this.servicios = new MatTableDataSource(servicios);
      this.paginator._intl.itemsPerPageLabel="Elementos por página"; // Edito string del paginador
      this.servicios.paginator = this.paginator;
      this.servicios.sort = this.sort;
    });
  }

  busquedaFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.servicios.filter = filterValue.trim().toLowerCase();

    if (this.servicios.paginator) {
      this.servicios.paginator.firstPage();
    }
  }

  accionServicio(modo: string, servicio?: Servicio): void {
    const dialogRef = this.dialog.open(DialogServicioComponent, {
      data: {servicio, modo}
    });
  }
}
