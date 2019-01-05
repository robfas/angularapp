import { Injectable } from '@angular/core';
import { Http ,HttpModule} from '@angular/http'

@Injectable()
export class AuthService {
  public getToken(): string {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return true;
    //return tokenNotExpired(null, token);
  }
}