import { Injectable } from '@angular/core';
import { Building } from '../components/models/Building';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/building/getAll';

  constructor(private http: HttpClient) { }

  getBuildings(): Observable<Building[]>{
    return this.http.get<Building[]>(this.getAllUrl);
  }
}
