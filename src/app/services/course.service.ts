import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../components/models/course';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  saveUrl: string = 'http://localhost:8080/SpringApp/course/save';

  constructor(private http: HttpClient) { }


  saveCourse(course: Course): Observable<Course>{
    return this.http.post<Course>(this.saveUrl, course, {headers});
  }
}
