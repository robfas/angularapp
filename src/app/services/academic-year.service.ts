import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademicYear } from '../components/models/AcademicYear';


const headers = new HttpHeaders({'Content-Type' : 'application/json'});


@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/academicyear/getAll';
  saveUrl: string = 'http://localhost:8080/SpringApp/academicyear/save';
  getAllYearsOfCourseUrl: string = 'http://localhost:8080/SpringApp/academicyear/getAllYearsOfCourse';

  constructor(private http: HttpClient) { }

  getAllYears(): Observable<AcademicYear[]>{
    return this.http.get<AcademicYear[]>(this.getAllUrl);
  }

  saveAcademicYear(academicYear: AcademicYear): Observable<AcademicYear>{
    return this.http.post<AcademicYear>(this.saveUrl, academicYear, {headers});
  }


  getAllYearsOfCourse(id: number): Observable<AcademicYear[]>{
    return this.http.get<AcademicYear[]>(this.getAllYearsOfCourseUrl + '/' + id);
  }
}
