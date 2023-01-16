import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Salon} from "../model/salon";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http: HttpClient) { }

  getSalas(): any {
    return this.http.get<Salon[]>("http://localhost:8080/salas/findSalas");
  }
  getSalon(id: number): any {
    return this.http.get<Salon>(`http://localhost:8080/salas/${id}`);
  }
  updateSalon(salon: Salon): any {
    return this.http.put<Salon>(`http://localhost:8080/salas/update`, salon);
  }
  createSalon(salon: Salon): any {
    return this.http.post<Salon>(`http://localhost:8080/salas/savesalon`, salon);
  }
  deleteSalon(id:number){
    return this.http.delete<Salon>(`http://localhost:8080/salas/delete/${id}`);
  }
}
