import { Injectable } from '@angular/core';
import { Tool } from '../components/models/Tool';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/tool/getAll';

  constructor(private http: HttpClient) { }

  getInstruments(): Observable<Tool[]>{
    return this.http.get<Tool[]>(this.getAllUrl);
  }
}