import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../components/models/Lesson';
import { LessonFile } from '../components/models/LessonFile';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  getAllTeacherLessonsUrl: string = 'http://localhost:8080/SpringApp/lesson/getAllTeacherLessons';
  getLessonFilesUrl: string = 'http://localhost:8080/SpringApp/file/getLessonFiles';
  fileLessonUploadUrl: string = 'http://localhost:8080/SpringApp/file/upload/filelesson';
  getFileUrl: string = 'http://localhost:8080/SpringApp/file/download/filelesson';

  constructor(private http: HttpClient) { }

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
}
