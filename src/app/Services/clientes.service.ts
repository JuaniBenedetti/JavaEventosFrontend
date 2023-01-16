import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient) { }

  getClientes(){
    return this.http.get("http://localhost:8080/clientes/findClientes");
  }
}
