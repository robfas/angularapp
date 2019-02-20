import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { CourseService } from '../../services/course.service';
import { DegreeCourse } from '../models/DegreeCourse';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: DegreeCourse[];
  firstlevel: DegreeCourse[];

  constructor(public nav: NavbarService, public courseService: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'employee') {
        const id = +this.route.snapshot.paramMap.get('id');
      this.nav.showNavStaff();
      this.courseService.getAll().subscribe(courses=>{
      this.firstlevel = courses.filter(courses=>courses.typeDegreeCourse.courseType.idcourseType === id)
    });
      } else {
        this.router.navigate(['/teacher']);
      }
    } else  {
      this.router.navigate(['/']);
    }
    
  }

}