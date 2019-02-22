import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../components/models/Lesson';
import { LessonFile } from '../components/models/LessonFile';
import { Feedback } from '../components/models/feedback';
import { GlobalService } from './global.service';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  getAllTeacherLessonsUrl: string = 'http://' + this.global.address + ':80/SpringApp/lesson/getAllTeacherLessons';
  getLessonFilesUrl: string = 'http://' + this.global.address + ':80/SpringApp/file/getLessonFiles';
  fileLessonUploadUrl: string = 'http://' + this.global.address + ':80/SpringApp/file/upload/filelesson';
  getFileUrl: string = 'http://' + this.global.address + ':80/SpringApp/file/download/filelesson';
  getFeedbackFileUrl: string = 'http://' + this.global.address + ':80/SpringApp/file/getFeedbackFile';
  getFeedbackLessonUrl: string = 'http://' + this.global.address + ':80/SpringApp/lesson/getFeedback';
  getAllLessonsByCourseAndTermUrl: string = 'http://' + this.global.address + ':80/SpringApp/lesson/getAllLessonsByCourseAndTerm';
  editLessonsUrl: string = 'http://' + this.global.address + ':80/SpringApp/lesson/edit';

  constructor(private http: HttpClient, public global: GlobalService) { }

  getAllTeacherLessons(idteacher: number): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.getAllTeacherLessonsUrl + '/' + idteacher);
  }

  getLessonFiles(idlesson: number): Observable<LessonFile[]>{
    return this.http.get<LessonFile[]>(this.getLessonFilesUrl + '/' + idlesson);
  }

  saveLessonFiles(file: File, idLesson: number): Observable<LessonFile> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post<LessonFile>(this.fileLessonUploadUrl + '/' + idLesson, uploadData);
  }

  getFile(idfile: number): Observable<{}>{
    return this.http.get<{}>(this.getFileUrl + '/' + idfile);
  }

  getFeedbackFiles(idfile: number): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.getFeedbackFileUrl + '/' + idfile);
  }

  getFeedback(idlesson: number): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.getFeedbackLessonUrl + '/' + idlesson);
  }

  getAllLessonsByCourseAndTerm(idcourse: number, idterm: number): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.getAllLessonsByCourseAndTermUrl + '/idcourse=' + idcourse + '&idterm=' + idterm);
  }

  editLessons(lessons: Lesson[]): Observable<{}> {
    return this.http.post<{}>(this.editLessonsUrl, lessons, {headers});
  }
}
