import { Injectable } from '@angular/core';
import { Ticket } from '../components/models/Ticket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/ticket/getAll';
  getById: string = 'http://localhost:8080/SpringApp/ticket/getById';
  saveUrl: string = 'http://localhost:8080/SpringApp/ticket/save';

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.getAllUrl);
  }

  getTicketById(id: number): Observable<Ticket>{
    return this.http.get<Ticket>(this.getById + '/' + id);
  }

  saveTicket(ticket: Ticket): Observable<Ticket>{
    return this.http.post<Ticket>(this.saveUrl, ticket, {headers});
  }
}
