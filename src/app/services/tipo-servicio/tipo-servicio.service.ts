import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoServicio } from 'src/app/model/tipoServicio';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<TipoServicio[]> {
    return this.http.get<TipoServicio[]>("http://localhost:8080/tipoServicio/findAll");
  }
}
