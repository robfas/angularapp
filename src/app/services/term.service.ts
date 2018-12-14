import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Term } from '../components/models/term';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class TermService {

  getTermByAcademicYearUrl: string = 'http://localhost:8080/SpringApp/academicyear/getTermsByAaId';

  constructor(private http: HttpClient) { }

  getTermByAcademicYearId(id: number): Observable<Term[]>{
    return this.http.get<Term[]>(this.getTermByAcademicYearUrl + '/' + id);
  }
}
