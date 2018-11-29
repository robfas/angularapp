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
  saveMessageUrl: string = 'http://localhost:8080/SpringApp/ticket/savemessage';

  constructor(private http: HttpClient) { }


  getMessages(id: number): Observable<TicketMessage[]>{
    return this.http.get<TicketMessage[]>(this.getAllByIdUrl + '/' + id);
  }

  saveMessage(ticketMessage: TicketMessage):Observable<TicketMessage>{
    return this.http.post<TicketMessage>(this.saveMessageUrl, ticketMessage, {headers});
  }
}
