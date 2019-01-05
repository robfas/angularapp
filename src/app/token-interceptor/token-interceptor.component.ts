import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { Http ,HttpModule} from '@angular/http'
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../components/models/User';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  user: User
  constructor(public auth: AuthService, public router: Router, public loginService: LoginService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    if(request.url!='http://localhost:8080/SpringApp/public/login' && request.url!='http://localhost:8080/SpringApp/refreshtoken') {
      /*this.loginService.refreshToken().subscribe(token => {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.user.token = JSON.stringify({ token: token })
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        console.log(localStorage.getItem('currentUser'))
      });*/
      
      request = request.clone({
        setHeaders: {
          'X-Auth': `${this.auth.getToken()}`
        }
      });
    } 
    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login route
            // or show a modal
            localStorage.removeItem('currentUser');
            this.router.navigate(['/']);
          }
        }
    }
    ));
    
    
  }

  private urlBase64Decode(str: string) {
      let output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
          case 0:
              break;
          case 2:
              output += '==';
              break;
          case 3:
              output += '=';
              break;
          default:
              // tslint:disable-next-line:no-string-throw
              throw 'Illegal base64url string!';
      }
      return decodeURIComponent((<any>window).escape(window.atob(output)));
  }

  public decodeToken(token: string = '') {
      if (token === null || token === '') { return { 'upn': '' }; }
      const parts = token.split('.');
      if (parts.length !== 3) {

          throw new Error('JWT must have 3 parts');
      }
      const decoded = this.urlBase64Decode(parts[1]);
      if (!decoded) {
          throw new Error('Cannot decode the token');
      }
      return JSON.parse(decoded);
  }
}