import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Evento} from "../model/evento";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventoServicesService {

  constructor(private http: HttpClient) { }

  getDataEventos(){
    return this.http.get(`http://localhost:8080/eventos/findEventos`);
  }

  updateEventos(evento: Evento): Observable<Evento>{
    return this.http.put<Evento>(`http://localhost:8080/eventos/putEventos`, evento);
  }

  deleteEventos(id: number){
    return this.http.delete<Evento>(`http://localhost:8080/eventos/deleteEventos/${id}`);
  }

  insertEvento(evento:Evento):Observable<Evento>{
    return this.http.post<Evento>(`http://localhost:8080/eventos`, evento);
  }

}
