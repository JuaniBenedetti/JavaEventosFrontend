import { Injectable } from '@angular/core';
import {API_URL} from '../app.constants';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticateUser';

@Injectable({
  providedIn: 'root'
})
export class
BasicJWTAuthServicesService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username: string, password: string) {
    return this.http.post<any>
    (`${API_URL}/authenticate`, {username, password}).pipe(
      map(
        data => {
          //console.log(data);
          //console.log(sessionStorage.getItem(TOKEN));
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }
  
  getAuthenticatedToken() {
    if (sessionStorage.getItem(AUTHENTICATED_USER)) {
      return sessionStorage.getItem(TOKEN);
    }
    return null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
  }
}
export class AuthenticationBean {
  constructor(public message: String) { }
}
