import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Teacher } from '../components/models/Teacher';
import { User } from '../components/models/User';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getAllTeachersUrl: string = 'http://localhost:8080/SpringApp/user/getTeachers';
  getTeacherUrl: string = 'http://localhost:8080/SpringApp/user/getTeacherById';
  saveUrl: string = 'http://localhost:8080/SpringApp/user/save';

  constructor(private http: HttpClient) { }

  getAllTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.getAllTeachersUrl);
  }

  getTeacher(id: number): Observable<Teacher>{
    return this.http.get<Teacher>(this.getTeacherUrl + '/' + id);
  }

  saveUser(user: User): Observable<User>{
    return this.http.post<User>(this.saveUrl, user, {headers});
  }

}
