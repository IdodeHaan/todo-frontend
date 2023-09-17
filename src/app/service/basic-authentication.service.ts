import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URL } from '../app.constants';

export const TOKEN = 'authToken'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})

export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeAuthenticationService(username: string, password: string) {
    let basicAuthHeaderString =  ('Basic ' + window.btoa(username + ':' + password))
    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, {headers: header})
    .pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
  }
  
  isUserLoggedIn() : boolean {
    let user = sessionStorage.getItem(AUTHENTICATED_USER) 
      return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }

  getAuthenticatedUser() : any {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthToken() : any {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN)
    }
  }
}

export class AuthenticationBean {
  constructor(public message:string) {}
}
