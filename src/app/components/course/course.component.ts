import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { Course } from '../models/course';
import { CourseService } from '../../services/course.service';
import { Subjectofstudy } from '../models/subjectofstudy';
import { SubjectofstudyService } from '../../services/subjectofstudy.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;
  nextPage: boolean = false;
  subjectofstudies: Subjectofstudy[];

  constructor(public nav: NavbarService, public courseService: CourseService, public subjectofstudyService: SubjectofstudyService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    console.log(this.nextPage);

  }


  save(name, description, academicyear, years){

    if (!name || !description || !description || (years==undefined) ){
      alert('Inserisci dati!');
    }else{

    this.courseService.saveCourse({name, description, academicyear, years} as Course).subscribe(course => {
      console.log(course);
    });

    this.nextPage = true;
  }
  
  

  }

}
