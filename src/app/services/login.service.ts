import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl: string = 'http://localhost:8080/SpringApp/login';
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
      return this.http.post<any>(`${this.loginUrl}`, { email: email, password: password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              //if (user && user.token) {
                if (user) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                }
              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
}

