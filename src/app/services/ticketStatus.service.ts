import { Injectable } from '@angular/core';
import { TicketStatus } from '../components/models/TicketStatus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketStatusService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/ticket/getAllTicketStatus';
  

  constructor(private http: HttpClient) { }

  getTicketStatus(): Observable<TicketStatus[]>{
    return this.http.get<TicketStatus[]>(this.getAllUrl);
  }
}
