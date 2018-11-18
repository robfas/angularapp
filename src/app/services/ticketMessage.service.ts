import { Injectable } from '@angular/core';
import { TicketMessage } from '../components/models/TicketMessage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketMessageService {
  getAllByIdUrl: string = 'http://localhost:8080/SpringApp/ticket/getMessages';

  constructor(private http: HttpClient) { }


  getMessages(id: number): Observable<TicketMessage[]>{
    return this.http.get<TicketMessage[]>(this.getAllByIdUrl + '/' + id);
  }
}
