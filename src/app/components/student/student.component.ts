import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student';
import{ DataService } from '../../services/data.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student: Student;
  students: Student[];

  showExtended: boolean = true;
  enableAdd: boolean = true;

  newStudent: Student = {
    firstname: '',
    lastname: '',
    age: null,
    email: ''
  };

  currentClasses: {};

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.student = {
    firstname: 'Mario',
    lastname: 'Rossi',
    age: 40,
    email: 'mrossi@gmail.com'
    
  };

  this.dataService.getStudents().subscribe(students=>{
    this.students = students;
  });

/*
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

  ];*/

this.addStudent({
  firstname: 'Adriana',
  lastname: 'Caione',
  //age: 31,
  //email: 'acaione@gmail.com'
  //hide: false
  });

this.currentClasses={
  "btn-success": this.enableAdd,
  "big-text": this.enableAdd
};
this.dataService.getData().subscribe(data=>{
  console.log(data);
});


}

addStudent(s: Student){
  s.hide=false;
  this.students.push(s);
  //this.students.unshift(s);
  

}

fireEvent(e){
  console.log('Button pressed');
  console.log(e.type);

}

toggleHide(s:Student){
  s.hide = !s.hide;
}

onSubmit(e){
  console.log('Submit pressed');
  e.preventDefault();

}

addNewStudent(){
  //this.students.push(this.newStudent);
  this.dataService.addStudents(this.newStudent);
}

}
