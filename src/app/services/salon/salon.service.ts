import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salon } from 'src/app/model/salon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  constructor(private http: HttpClient) { }

  save(salon: Salon): Observable<Salon> {
    return this.http.post<Salon>(environment.backendURL + 'salon/save', salon);
  }

  update(salon: Salon): Observable<Salon> {
    return this.http.put<Salon>(environment.backendURL + 'salon/update', salon);
  }

  delete(idSalon: number) {
    return this.http.delete<Salon>(`${environment.backendURL}salon/delete?id=${idSalon}`);
  }

  findAll(): Observable<Salon[]> {
    return this.http.get<Salon[]>(environment.backendURL + 'salon/findAll');
  }
}
