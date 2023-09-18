import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { JwtAuthenticationService } from '../jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthenticationService: BasicAuthenticationService,
    private jwtAuthenticationService: JwtAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // let basicAuthHeaderString = this.basicAuthenticationService.getAuthToken();
    let jwtHeaderString = this.jwtAuthenticationService.getAuthToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    // if (basicAuthHeaderString && username) {
          
    //   req = req.clone({
    //     setHeaders: {
    //       Authorization: basicAuthHeaderString
    //     }
    //   })  
    // } 
    if (jwtHeaderString && username) {
      console.log("in jwt inceptor")
      req = req.clone({
        setHeaders: {
          Authorization: jwtHeaderString
        }
      })
    }
    return next.handle(req)
  }
}
