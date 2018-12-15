import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubjectStudy } from '../components/models/subjectstudy';
import { TypeSubject } from '../components/models/TypeSubject';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  getAllUrl = 'http://localhost:8080/SpringApp/subject/getAll';
  saveUrl = 'http://localhost:8080/SpringApp/subject/save';
  getByIdCourseUrl = 'http://localhost:8080/SpringApp/subject/getByIdCourse';
  getAllSubjectTypesUrl = 'http://localhost:8080/SpringApp/subject/getAllSubjectTypes';
  getAllByTeacherUrl = 'http://localhost:8080/SpringApp/subject/getByIdTeacher';

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

  getAllSubjectTypes(): Observable<TypeSubject[]>{
    return this.http.get<TypeSubject[]>(this.getAllSubjectTypesUrl);
  }

  getAllByTeacher(id: number):Observable<SubjectStudy[]>{
    return this.http.get<SubjectStudy[]>(this.getAllByTeacherUrl);
  }
}
