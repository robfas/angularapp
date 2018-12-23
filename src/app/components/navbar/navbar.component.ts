import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { LoginService } from '../../services/login.service';
import { first } from 'rxjs/operators';
import{User} from '../models/User';
import { NavbarService } from '../../services/navbar.service';
import { CourseService } from '../../services/course.service';
import { DegreeCourse } from '../models/DegreeCourse';
import { CourseType } from '../models/CourseType';
import { SubjectService } from '../../services/subject.service';
import { SubjectStudy } from '../models/SubjectStudy';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  courses: DegreeCourse[];
  courseTypes: CourseType[];
  subjects: SubjectStudy[];
 

  constructor(public nav: NavbarService, private loginService: LoginService, private router: Router, public courseService: CourseService, public subjectService: SubjectService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.user={
        iduser:JSON.parse(localStorage.getItem('currentUser')).iduser,
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname
      }
    }
    this.courseService.getAllCourseTypes().subscribe(courseTypes=>{
      this.courseTypes=courseTypes;
      console.log(courseTypes)
    });
    this.subjectService.getAll().subscribe(subjects => {
      this.subjects = subjects.filter(subjects=>subjects.teacherDTO.idteacher == 2);
      console.log(this.subjects);
    });
   
  }

  signInUser(email,password) {
    this.loginService.login(email,password)
            .pipe(first())
            .subscribe(
                data => {
                  if (data.type == "teacher") {
                    this.user={
                      name: data.name,
                      surname: data.surname,
                      iduser: data.iduser
                    }
                    this.router.navigate(['/teacher']);
                  } else if(data.type  == "employee") {
                    this.user={
                      name: data.name,
                      surname: data.surname,
                      iduser: data.iduser
                    }
                    this.router.navigate(['/staff']);
                  } else {
                    alert("Accesso non autorizzato");
                  }
                },
                error => {
                  alert(error.error.message);
                });
  }

  logout() {
    this.loginService.logout();
    this.nav.showHome();
    this.router.navigate(['/']);
  }
}
