import { Injectable } from '@angular/core';
import { Ticket } from '../components/models/Ticket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/ticket/getAll';
  getById: string = 'http://localhost:8080/SpringApp/ticket/getById';

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.getAllUrl);
  }

  getTicketById(id: number): Observable<Ticket>{
    return this.http.get<Ticket>(this.getById + '/' + id);
  }
}
