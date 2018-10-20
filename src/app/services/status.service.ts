import { Injectable } from '@angular/core';
import { Status } from '../components/models/Status';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/status/getAll';
  

  constructor(private http: HttpClient) { }

  getStatus(): Observable<Status[]>{
    return this.http.get<Status[]>(this.getAllUrl);
  }
}
