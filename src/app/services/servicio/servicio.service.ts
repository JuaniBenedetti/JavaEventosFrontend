import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from 'src/app/model/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  save(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>("http://localhost:8080/servicio/save", servicio);
  }

  update(servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>("http://localhost:8080/servicio/update", servicio);
  }

  delete(idServicio: number) {
    return this.http.delete<Servicio>(`http://localhost:8080/servicio/delete?id=${idServicio}`);
  }

  findAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>("http://localhost:8080/servicio/findAll");
  }
}
