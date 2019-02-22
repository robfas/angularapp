import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademicYear } from '../components/models/AcademicYear';
import { Term } from '../components/models/Term';
import { GlobalService } from './global.service';


const headers = new HttpHeaders({'Content-Type' : 'application/json'});


@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {
  getAllUrl: string = 'http://' + this.global.address + ':80/SpringApp/academicyear/getAll';
  saveUrl: string = 'http://' + this.global.address + ':80/SpringApp/academicyear/save';
  getAllYearsOfCourseUrl: string = 'http://' + this.global.address + ':80/SpringApp/academicyear/getAllYearsOfCourse';
  getTermsByAcademicyearUrl: string = 'http://' + this.global.address + ':80/SpringApp/academicyear/getTermsByAaId';
  saveTermUrl: string = 'http://' + this.global.address + ':80/SpringApp/academicyear/saveTerm';
  saveAllTermUrl: string = 'http://' + this.global.address + ':80/SpringApp/academicyear/saveAllTerm';

  constructor(private http: HttpClient, public global: GlobalService) { }

  getAllYears(): Observable<AcademicYear[]>{
    return this.http.get<AcademicYear[]>(this.getAllUrl);
  }

  saveAcademicYear(academicYear: AcademicYear): Observable<AcademicYear>{
    return this.http.post<AcademicYear>(this.saveUrl, academicYear, {headers});
  }


  getAllYearsOfCourse(id: number): Observable<AcademicYear[]>{
    return this.http.get<AcademicYear[]>(this.getAllYearsOfCourseUrl + '/' + id);
  }

  getTermsByAA(id: number):  Observable<Term[]>{
    return this.http.get<Term[]>(this.getTermsByAcademicyearUrl + '/' + id);
  }

  saveTerm(term: Term): Observable<Term>{
    return this.http.post<Term>(this.saveTermUrl, term, {headers});
  }

  saveAllTerm(terms: Term[]): Observable<Term[]>{
    return this.http.post<Term[]>(this.saveAllTermUrl, terms, {headers});
  }
}
