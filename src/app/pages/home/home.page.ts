import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Salon } from 'src/app/model/salon';
import { SalonService } from 'src/app/services/salon/salon.service';
import { DialogSalonComponent } from 'src/app/shared/components/dialog-salon/dialog-salon.component';
import { Store } from '@ngxs/store';
import { SetSalon } from 'src/app/model/states/salonState';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion/iniciar-sesion.service';
import { Rol } from 'src/app/model/enums/rol';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // Se utiliza para verificar si se puede editar
  edicion: boolean = false;
  // Se utiliza para cambiar de modo
  modoEdicion: boolean = false;

  salones: Salon[];
  salonesFiltrados: Salon[];

  ordenamientos: String[] = [
    "Nombre",
    "Costo por dia",
    "Capacidad"
  ];

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private router: Router,
    private _salonService: SalonService,
    private _iniciarSesion: IniciarSesionService
    ) { }

  ngOnInit(): void {
    this._salonService.findAll().subscribe(salones => {
      this.salones = salones;
      this.salonesFiltrados = [...salones];
    });

    this.edicion = this.permitirEdicion();
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
      data: {salon: salon, modoEdicion: this.edicion}
    });
    dialogRef.afterClosed().subscribe(v => {
      if(v) {
        this.store.dispatch(new SetSalon(salon));
        this.router.navigate(['alquilar-salon']);
      }
    });
  }

  cambiarModoEdicion() {
    this.modoEdicion = !this.modoEdicion;
  }

  permitirEdicion(): boolean {
    let rolesUsuario: Rol[] = this._iniciarSesion.getRolesUsuario();
    return rolesUsuario.includes(Rol.ROLE_OWNER) || rolesUsuario.includes(Rol.ROLE_ADMIN);
  }
}
