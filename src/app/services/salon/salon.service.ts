import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salon } from 'src/app/model/salon';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  constructor(private http: HttpClient) { }

  save(salon: Salon): Observable<Salon> {
    return this.http.post<Salon>("http://localhost:8080/salon/save", salon);
  }

  findAll(): Observable<Salon[]> {
    return this.http.get<Salon[]>("http://localhost:8080/salon/findAll");
  }
}
