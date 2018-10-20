import { Injectable } from '@angular/core';
import { Instrument } from '../components/models/Instrument';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/instruments/getAll';

  constructor(private http: HttpClient) { }

  getInstruments(): Observable<Instrument[]>{
    return this.http.get<Instrument[]>(this.getAllUrl);
  }
}