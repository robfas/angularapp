import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubjectStudy } from '../components/models/subjectstudy';
import { TypeSubject } from '../components/models/TypeSubject';
import { GlobalService } from './global.service';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  getAllUrl = 'http://' + this.global.address + ':80/SpringApp/subject/getAll';
  saveUrl = 'http://' + this.global.address + ':80/SpringApp/subject/save';
  saveAllUrl = 'http://' + this.global.address + ':80/SpringApp/subject/saveAll';
  getByIdCourseUrl = 'http://' + this.global.address + ':80/SpringApp/subject/getByIdCourse';
  getAllSubjectTypesUrl = 'http://' + this.global.address + ':80/SpringApp/subject/getAllSubjectTypes';
  getAllByTeacherUrl = 'http://' + this.global.address + ':80/SpringApp/subject/getByIdTeacher';
  saveTypeUrl = 'http://' + this.global.address + ':80/SpringApp/subject/saveTypeSubject';

  constructor(private http: HttpClient, public global: GlobalService) { }

  getAll(): Observable<SubjectStudy[]>{
    return this.http.get<SubjectStudy[]>(this.getAllUrl, {headers: headers});
  }

  saveSubject(subject: SubjectStudy): Observable<SubjectStudy>{
    return this.http.post<SubjectStudy>(this.saveUrl, subject, {headers});
  }

  saveAllSubject(subjects: SubjectStudy[]): Observable<SubjectStudy[]>{
    return this.http.post<SubjectStudy[]>(this.saveAllUrl, subjects, {headers});
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

  saveTypeSubject(typeSubject: TypeSubject): Observable<TypeSubject>{
    return this.http.post<TypeSubject>(this.saveTypeUrl, typeSubject, {headers});
  }

}
