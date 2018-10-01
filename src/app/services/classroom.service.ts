import { Injectable } from '@angular/core';
import { Class} from '../components/models/Class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/classroom/getAll';

  constructor(private http: HttpClient) { }

  getClassrooms(): Observable<Class[]>{
    return this.http.get<Class[]>(this.getAllUrl);
  }
}
