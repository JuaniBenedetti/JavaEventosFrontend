import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  constructor(private http: HttpClient) { }

  save(tipoServicio: TipoServicio): Observable<TipoServicio> {
    return this.http.post<TipoServicio>(environment.backendURL + 'tipoServicio/save', tipoServicio);
  }

  update(tipoServicio: TipoServicio): Observable<TipoServicio> {
    return this.http.put<TipoServicio>(environment.backendURL + 'tipoServicio/update', tipoServicio);
  }

  delete(idTipoServicio: number) {
    return this.http.delete<TipoServicio>(`${environment.backendURL}tipoServicio/delete?id=${idTipoServicio}`);
  }

  findAll(): Observable<TipoServicio[]> {
    return this.http.get<TipoServicio[]>(environment.backendURL + 'tipoServicio/findAll');
  }
}
