import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URL } from '../app.constants';

export const TOKEN = 'authToken'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})

export class JwtAuthenticationService {

  constructor(private http: HttpClient) { }

  executeJwTAuthenticationService(username: string, password: string) {
    
    return this.http.post<any>(`${API_URL}/authenticate`, {username, password})
    .pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
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
