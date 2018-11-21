import { Injectable } from '@angular/core';
import { TicketMessage } from '../components/models/TicketMessage';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from '../components/models/Ticket';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class TicketMessageService {
  getAllByIdUrl: string = 'http://localhost:8080/SpringApp/ticket/getMessages';
  saveMessageUrl: string = 'http://localhost:8080/SpringApp/ticket/savestaff';

  constructor(private http: HttpClient) { }


  getMessages(id: number): Observable<TicketMessage[]>{
    return this.http.get<TicketMessage[]>(this.getAllByIdUrl + '/' + id);
  }

  saveMessage(ticket: Ticket, ticketMessage: TicketMessage):Observable<Ticket>{
    return this.http.post<Ticket>(this.saveMessageUrl, ticket, {headers});
  }
}
