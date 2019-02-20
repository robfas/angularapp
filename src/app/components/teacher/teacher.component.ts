import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../models/Lesson';
import { getTime } from 'date-fns';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  
  constructor(public nav: NavbarService, private router: Router, public _DomSanitizer: DomSanitizer, public lessonService: LessonService, public userService: UserService) { }
  user: User;
  lessons: Lesson[];
  showLessons: boolean;
  start: any;
  datePipe = new DatePipe('en-US');

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'teacher') {
        this.user= JSON.parse(localStorage.getItem('currentUser'))
        this.nav.showNavTeacher();
        this.start =  this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
        this.lessonService.getAllTeacherLessons(this.user.iduser).subscribe(lessons=>{
          this.lessons = lessons.filter(lessons=>this.datePipe.transform(lessons.start, 'dd/MM/yyyy')===this.start)
         
          if(this.lessons.length>0){
            this.showLessons = true;
          }
          else this.showLessons = false;
        });
      } else {
        this.router.navigate(['/staff']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }


  save(residence,domicile,phone){
    this.userService.saveUser({iduser: this.user.iduser, name: this.user.name, surname: this.user.surname, email: this.user.email, phone: phone, residence: residence, domicile: domicile, citizenship: this.user.citizenship, placeBirth: this.user.placeBirth, sex: this.user.sex, ssn: this.user.ssn, dateBirth: this.user.dateBirth, type: this.user.type} as User).subscribe(user => {
    });
  }


}
