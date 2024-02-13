import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

  save(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>("http://localhost:8080/cliente/save", cliente);
  }
}
