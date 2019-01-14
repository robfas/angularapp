import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../models/Lesson';
import { getTime } from 'date-fns';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  
  constructor(public nav: NavbarService, private router: Router, public lessonService: LessonService) { }
  user: User;
  lessons: Lesson[];
  showLessons: boolean;

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'teacher') {
        this.user={
          iduser: JSON.parse(localStorage.getItem('currentUser')).iduser,
          name: JSON.parse(localStorage.getItem('currentUser')).name,
          surname: JSON.parse(localStorage.getItem('currentUser')).surname,
          residence: JSON.parse(localStorage.getItem('currentUser')).residence,
          phone: JSON.parse(localStorage.getItem('currentUser')).phone,
          email: JSON.parse(localStorage.getItem('currentUser')).email,
          dateBirth: JSON.parse(localStorage.getItem('currentUser')).dateBirth,
        }
        this.nav.showNavTeacher();
        this.lessonService.getAllTeacherLessons(this.user.iduser).subscribe(lessons=>{
       //   this.lessons = lessons.filter(lessons=>lessons.start === Date.now());

          console.log(this.lessons);
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


}
