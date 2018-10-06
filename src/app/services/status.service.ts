import { Injectable } from '@angular/core';
import { Status } from '../components/models/Status';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  

  constructor() { }

  /*getStatus(): Observableble<Status[]>{
    return this.http.get<Status[]>(this.ge());
  }*/
}
