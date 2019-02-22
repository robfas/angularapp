import { Injectable } from '@angular/core';
import { Tool } from '../components/models/Tool';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  getAllUrl: string = 'http://' + this.global.address + ':80/SpringApp/tool/getAll';

  constructor(private http: HttpClient, public global: GlobalService) { }

  getInstruments(): Observable<Tool[]>{
    return this.http.get<Tool[]>(this.getAllUrl);
  }
}