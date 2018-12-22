import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from '../components/models/exam';
import { ExamType } from '../components/models/ExamType';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  getByCourseAndTermUrl: string = 'http://localhost:8080/SpringApp/exam/getAllByCourseAndTerm';
  getAllTypesUrl: string = 'http://localhost:8080/SpringApp/exam/getAllTypes';
  saveAllUrl: string = 'http://localhost:8080/SpringApp/exam/save';

  constructor(private http: HttpClient) { }

  getAllByCourseAndTerm(idcourse: number, idterm: number): Observable<Exam[]>{
    return this.http.get<Exam[]>(this.getByCourseAndTermUrl + '/idcourse=' + idcourse + '&idterm=' + idterm);
  }

  getAllExamTypes(): Observable<ExamType[]>{
    return this.http.get<ExamType[]>(this.getAllTypesUrl);
  }

  saveAll(exams: Exam[]): Observable<boolean>{
    return this.http.post<boolean>(this.saveAllUrl, exams, {headers});
  }

}
