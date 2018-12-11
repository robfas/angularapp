import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { CourseService } from '../../services/course.service';
import { DegreeCourse } from '../models/DegreeCourse';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: DegreeCourse[];

  constructor(public nav: NavbarService, public courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.nav.showNavStaff();
    this.courseService.getAll().subscribe(courses=>{
      this.courses = courses.filter(courses=>courses.typeDegreeCourse.courseType.idcourseType === id)
      console.log(id,this.courses);
    });
  }

}