import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/model/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  save(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>("http://localhost:8080/reserva/save", reserva);
  }

  delete(idReserva: number) {
    return this.http.delete<Reserva>(`http://localhost:8080/reserva/delete?id=${idReserva}`);
  }

  findAll(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>("http://localhost:8080/reserva/findAll");
  }
}
