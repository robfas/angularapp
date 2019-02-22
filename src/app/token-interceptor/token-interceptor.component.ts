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
import { GlobalService } from '../services/global.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  user: User
  constructor(public auth: AuthService, public router: Router, public loginService: LoginService, public global: GlobalService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    if(request.url!='http://' + this.global.address + ':80/SpringApp/public/login' && request.url!='http://' + this.global.address + ':80/SpringApp/refreshtoken') {
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

}