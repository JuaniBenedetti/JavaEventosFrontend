import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from 'src/app/model/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>("http://localhost:8080/servicio/findAll");
  }
}
