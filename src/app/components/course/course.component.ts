import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { Course } from '../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;
  nextPage: boolean = false;

  constructor(public nav: NavbarService, public courseService: CourseService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    console.log(this.nextPage);

  }


  save(name, description, years){

    if (!name || !description || (years==undefined) ){
      alert('Inserisci dati!');
    }else{

    this.courseService.saveCourse({name, description, years} as Course).subscribe(course => {
      console.log(course);
    });

    this.nextPage = true;
  }
  
  

  }

}
