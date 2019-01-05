import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl: string = 'http://localhost:8080/SpringApp/public/login';
  refreshTokenUrl: string = 'http://localhost:8080/SpringApp/refreshtoken';
  
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

  refreshToken(): Observable<String> {
    return this.http.get<String>(this.refreshTokenUrl, {headers: {'X-Auth' : JSON.parse(localStorage.getItem('currentUser')).token}});
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
}

