import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubjectStudy } from '../components/models/subjectstudy';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  getAllUrl = 'http://localhost:8080/SpringApp/subject/getAll';
  saveUrl = 'http://localhost:8080/SpringApp/subject/save';
  getByIdCourseUrl = 'http://localhost:8080/SpringApp/subject/getByIdCourse';

  constructor(private http: HttpClient) { }

  getAll(): Observable<SubjectStudy[]>{
    return this.http.get<SubjectStudy[]>(this.getAllUrl);
  }

  saveSubject(subject: SubjectStudy): Observable<SubjectStudy>{
    return this.http.post<SubjectStudy>(this.saveUrl, subject, {headers});
  }

  getByIdCourse(id: number): Observable<SubjectStudy[]>{
    return this.http.get<SubjectStudy[]>(this.getByIdCourseUrl + '/' + id);
  }
}
