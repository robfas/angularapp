import { Injectable } from '@angular/core';
import { Ticket } from '../components/models/Ticket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  getAllUrl: string = 'http://' + this.global.address + ':80/SpringApp/ticket/getAll';
  getById: string = 'http://' + this.global.address + ':80/SpringApp/ticket/getById';
  saveUrl: string = 'http://' + this.global.address + ':80/SpringApp/ticket/save';


  constructor(private http: HttpClient, public global: GlobalService) {}

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
