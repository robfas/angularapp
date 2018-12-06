import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../components/models/subject';
import { TypeSubject } from '../components/models/TypeSubject';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class SubjectofstudyService {
  getAllUrl = 'http://localhost:8080/SpringApp/subject/getAll';
  saveUrl = 'http://localhost:8080/SpringApp/subject/save';
  getAllSubjectTypesUrl = 'http://localhost:8080/SpringApp/subject/getAllSubjectTypes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Subject[]>{
    return this.http.get<Subject[]>(this.getAllUrl);
  }

  saveSubject(subject: Subject): Observable<Subject>{
    return this.http.post<Subject>(this.saveUrl, subject, {headers});
  }

  getAllSubjectTypes(): Observable<TypeSubject[]>{
    return this.http.get<TypeSubject[]>(this.getAllSubjectTypesUrl);
  }
}
