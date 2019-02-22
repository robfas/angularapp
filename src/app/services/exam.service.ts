import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from '../components/models/exam';
import { ExamType } from '../components/models/ExamType';
import { ExamEnrollment } from '../components/models/ExamEnrollment';
import { GlobalService } from './global.service';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  getByCourseAndTermUrl: string = 'http://' + this.global.address + ':80/SpringApp/exam/getAllByCourseAndTerm';
  getAllTypesUrl: string = 'http://' + this.global.address + ':80/SpringApp/exam/getAllTypes';
  saveAllUrl: string = 'http://' + this.global.address + ':80/SpringApp/exam/save';
  getAllAvailableByTeacherUrl: string = 'http://' + this.global.address + ':80/SpringApp/exam/getAllAvailableByTeacher';
  insertGradeUrl: string = 'http://' + this.global.address + ':80/SpringApp/exam/insertGrade';

  constructor(private http: HttpClient, public global: GlobalService) { }

  getAllByCourseAndTerm(idcourse: number, idterm: number): Observable<Exam[]>{
    return this.http.get<Exam[]>(this.getByCourseAndTermUrl + '/idcourse=' + idcourse + '&idterm=' + idterm);
  }

  getAllExamTypes(): Observable<ExamType[]>{
    return this.http.get<ExamType[]>(this.getAllTypesUrl);
  }

  saveAll(exams: Exam[]): Observable<boolean>{
    return this.http.post<boolean>(this.saveAllUrl, exams, {headers});
  }

  getAllAvailableByTeacher(idteacher: number): Observable<Exam[]>{
    return this.http.get<Exam[]>(this.getAllAvailableByTeacherUrl + '/' + idteacher);
  }

  insertGrade(enrollments: ExamEnrollment[], idexam: number): Observable<{}>{
    return this.http.post<{}>(this.insertGradeUrl + '/' + idexam, enrollments, {headers});
  }

}
