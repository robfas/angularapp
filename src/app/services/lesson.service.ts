import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../components/models/Lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  getAllTeacherLessonsUrl: string = 'http://localhost:8080/SpringApp/lesson/getAllTeacherLessons';

  constructor(private http: HttpClient) { }

  getAllTeacherLessons(idteacher: number): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.getAllTeacherLessonsUrl + '/' + idteacher);
  }
}
