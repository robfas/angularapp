import { Injectable } from '@angular/core';
import { Student } from '../components/models/Student';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  student: Student;
  students: Student[];

  data: Observable<any>;


  constructor() { 
    this.students = [
      {
      firstname: 'Alessandro',
      lastname: 'Fiore',
      age: 35,
      email: 'a.fiore@gmail.com',
      hide: false
    },
    {
      firstname: 'Gigi',
      lastname: 'Manco',
      age: 35,
      email: 'gigi.manco@gmail.com',
      hide: false
    },
    {
      firstname: 'Rob',
      lastname: 'Ver',
      age: 35,
      email: 'r.ver@gmail.com',
      hide: false
    }
  
  ];
  }

  getStudents(): Observable<Student[]>{
    return of(this.students);
  }

  addStudents(s: Student){
    this.students.unshift(s);
  }

  getData(){
    this.data = new Observable(observer => {
      
      setTimeout( () => {
        observer.next(1);
      }, 1000);
      setTimeout( () => {
        observer.next(2);
      }, 2000);
      setTimeout( () => {
        observer.next(3);
      }, 3000);
      setTimeout( () => {
        observer.next(4);
      }, 4000);

    });
    return this.data;
  }
}
