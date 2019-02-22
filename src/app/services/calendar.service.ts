import { Injectable } from '@angular/core';
import { Scheduler } from '../components/models/Scheduler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DegreeCourse } from '../components/models/DegreeCourse';
import { TypeLesson } from '../components/models/TypeLesson';
import { GlobalService } from './global.service';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  saveUrl: string = 'http://' + this.global.address + ':80/SpringApp/scheduler/save';
  schedulerExistsUrl: string = 'http://' + this.global.address + ':80/SpringApp/scheduler/exists';
  getSchedulerUrl: string = 'http://' + this.global.address + ':80/SpringApp/scheduler/getScheduler';

  constructor(private http: HttpClient, public global: GlobalService) { }

  save(scheduler: Scheduler): Observable<Scheduler>{
    return this.http.post<Scheduler>(this.saveUrl, scheduler, {headers});
  }

  schedulerExists(idterm: number, idcourse: number): Observable<number>{
    return this.http.get<number>(this.schedulerExistsUrl + '/' + idterm + '&' + idcourse);
  }

  getScheduler(course: DegreeCourse, idterm: number): Observable<TypeLesson[]>{
    return this.http.post<TypeLesson[]>(this.getSchedulerUrl + '/' + idterm, course, {headers});
  }
}
