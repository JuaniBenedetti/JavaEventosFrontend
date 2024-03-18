import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/model/reserva';
import { Salon } from 'src/app/model/salon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  save(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(environment.backendURL + 'reserva/save', reserva);
  }

  delete(idReserva: number) {
    return this.http.delete<Reserva>(`${environment.backendURL}reserva/delete?id=${idReserva}`);
  }

  findAll(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(environment.backendURL + 'reserva/findAll');
  }

  findFechasReservadas(salon: Salon): Observable<Date[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("idSalon", salon.idSalon); 
    return this.http.get<Date[]>(environment.backendURL + 'reserva/findFechasReservadas', {params: httpParams});
  }
}
