import { Injectable } from '@angular/core';
import { Class} from '../components/models/Class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/classroom/getAll';
  getByBuildingUrl: string = 'http://localhost:8080/SpringApp/classroom/getByIdBuilding/';
  getByBuildingAndNameUrl: string = 'http://localhost:8080/SpringApp/classroom/getByIdBuildingAndName/';
  getByNameUrl: string = 'http://localhost:8080/SpringApp/classroom/getByName/';
  getByIdUrl: string = 'http://localhost:8080/SpringApp/classroom/getById/';

  constructor(private http: HttpClient) { }

  getAllClassrooms(): Observable<Class[]>{
    return this.http.get<Class[]>(this.getAllUrl);
  }

  getClassroomsByBuilding(idBuilding: number): Observable<Class[]>{
    return this.http.get<Class[]>(this.getByBuildingUrl + idBuilding);
  }

  getClassroomsByBuildingAndName(idBuilding: number, name: string): Observable<Class[]>{
    return this.http.get<Class[]>(this.getByBuildingAndNameUrl + idBuilding + "&" + name);
  }

  getClassroomsByName(name: string): Observable<Class[]>{
    return this.http.get<Class[]>(this.getByNameUrl + name);
  }

  getClassroomDetail(id: number): Observable<Class>{
    return this.http.get<Class>(this.getByIdUrl + '/' + id);
  }
}