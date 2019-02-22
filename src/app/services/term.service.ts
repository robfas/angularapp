import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Term } from '../components/models/term';
import { GlobalService } from './global.service';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class TermService {

  getTermByAcademicYearUrl: string = 'http://' + this.global.address + ':80/SpringApp/academicyear/getTermsByAaId';

  constructor(private http: HttpClient, public global: GlobalService) { }

  getTermByAcademicYearId(id: number): Observable<Term[]>{
    return this.http.get<Term[]>(this.getTermByAcademicYearUrl + '/' + id);
  }
}
