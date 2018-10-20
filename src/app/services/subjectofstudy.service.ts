import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subjectofstudy } from '../components/models/subjectofstudy';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class SubjectofstudyService {
  getAllUrl = 'http://localhost:8080/SpringApp/subjectofstudy/getAll';
  saveUrl = 'http://localhost:8080/SpringApp/subjectofstudy/save';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Subjectofstudy[]>{
    return this.http.get<Subjectofstudy[]>(this.getAllUrl);
  }

  saveSubject(subjectofstudy: Subjectofstudy): Observable<Subjectofstudy>{
    return this.http.post<Subjectofstudy>(this.saveUrl, subjectofstudy, {headers});
  }
}
