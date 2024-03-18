import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from 'src/app/model/servicio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  save(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(environment.backendURL + 'servicio/save', servicio);
  }

  update(servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(environment.backendURL + 'servicio/update', servicio);
  }

  delete(idServicio: number) {
    return this.http.delete<Servicio>(`${environment.backendURL}servicio/delete?id=${idServicio}`);
  }

  findAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(environment.backendURL + 'servicio/findAll');
  }
}
