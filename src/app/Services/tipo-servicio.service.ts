import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoServicio } from '../model/tiposervicio';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  constructor(private http: HttpClient) { }

  
  saveTipoServicio(tipoServicio: TipoServicio): Observable<TipoServicio> {
    return this.http.post<TipoServicio>("http://localhost:8080/tipoServicio/save", tipoServicio);
  }

  update(tipoServicio: TipoServicio): Observable<TipoServicio> {
    return this.http.put<TipoServicio>("http://localhost:8080/tipoServicio/update", tipoServicio);
  }

  delete(id: number): Observable<TipoServicio> {
    return this.http.delete<TipoServicio>(`http://localhost:8080/tipoServicio/delete/${id}`);
  }

  findAll(): Observable<TipoServicio[]>{
    return this.http.get<TipoServicio[]>("http://localhost:8080/tipoServicio/findAll");
  }
}
