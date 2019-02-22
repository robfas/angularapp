import { Injectable } from '@angular/core';
import { TicketStatus } from '../components/models/TicketStatus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TicketStatusService {
  getAllUrl: string = 'http://' + this.global.address + ':80/SpringApp/ticket/getAllTicketStatus';
  

  constructor(private http: HttpClient, public global: GlobalService) { }

  getTicketStatus(): Observable<TicketStatus[]>{
    return this.http.get<TicketStatus[]>(this.getAllUrl);
  }
}
