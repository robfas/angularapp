import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DegreeCourse } from '../components/models/DegreeCourse';
import { Observable } from 'rxjs';
import { TypeDegreeCourse } from '../components/models/TypeDegreeCourse';
import { CourseType } from '../components/models/CourseType';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  saveUrl: string = 'http://localhost:8080/SpringApp/course/save';
  getAllTypesUrl: string = 'http://localhost:8080/SpringApp/course/getAllTypes';
  getTypesByIdUrl: string = 'http://localhost:8080/SpringApp/course/getTypesById';
  getAllCourseTypesUrl: string = 'http://localhost:8080/SpringApp/course/getAllCourseTypes';
  getCourseTypeUrl: string = 'http://localhost:8080/SpringApp/course/getCourseType';

  constructor(private http: HttpClient) { }


  saveCourse(course: DegreeCourse): Observable<DegreeCourse>{
    return this.http.post<DegreeCourse>(this.saveUrl, course, {headers});
  }

  getAllTypes(): Observable<TypeDegreeCourse[]>{
    return this.http.get<TypeDegreeCourse[]>(this.getAllTypesUrl);
  }

  getTypesById(id: number): Observable<TypeDegreeCourse>{
    return this.http.get<TypeDegreeCourse>(this.getTypesByIdUrl + '/' + id);
  }

  getAllCourseTypes():Observable<CourseType[]>{
    return this.http.get<CourseType[]>(this.getAllCourseTypesUrl);
  }

  getCourseType(id: number):Observable<CourseType>{
    return this.http.get<CourseType>(this.getCourseTypeUrl + '/' + id);
  }
}
