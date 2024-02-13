import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/model/reserva';
import { Salon } from 'src/app/model/salon';

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

  findFechasReservadas(salon: Salon): Observable<Date[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("idSalon", salon.idSalon); 
    return this.http.get<Date[]>("http://localhost:8080/reserva/findFechasReservadas", {params: httpParams});
  }
}
