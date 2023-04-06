import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { TipoServicioService } from 'src/app/services/tipo-servicio/tipo-servicio.service';

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
    private _tipoServicioService: TipoServicioService
  ) { }

  ngOnInit() {
    this._tipoServicioService.findAll().subscribe((tiposServicio: TipoServicio[]) => {
      this.tiposServicio = new MatTableDataSource(tiposServicio);
      this.paginator._intl.itemsPerPageLabel="Elementos por página"; // Edito string del paginador
      this.tiposServicio.paginator = this.paginator;
      this.tiposServicio.sort = this.sort;
    });
  }

  busquedaFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tiposServicio.filter = filterValue.trim().toLowerCase();

    if (this.tiposServicio.paginator) {
      this.tiposServicio.paginator.firstPage();
    }
  }
}
