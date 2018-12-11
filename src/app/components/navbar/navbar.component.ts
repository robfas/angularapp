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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  courses: DegreeCourse[];
  courseTypes: CourseType[];

  constructor(public nav: NavbarService, private loginService: LoginService, private router: Router, public courseService: CourseService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.user={
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname
      }
    }
    this.courseService.getAllCourseTypes().subscribe(courseTypes=>{
      this.courseTypes=courseTypes;
      console.log(courseTypes)
    })
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
