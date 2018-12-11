import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { DegreeCourse } from '../models/DegreeCourse';
import { CourseService } from '../../services/course.service';
import { SubjectStudy } from '../models/subjectstudy';
import { SubjectService } from '../../services/subject.service';
import { TypeDegreeCourse } from '../models/TypeDegreeCourse';
import { CourseType } from '../models/CourseType';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: DegreeCourse;
  degreeCourseType: TypeDegreeCourse;
  degreeCourseTypes: TypeDegreeCourse[];
  courseType: CourseType;
  courseTypes: CourseType[];
  nextPage: boolean = false;
  subjectofstudies: SubjectStudy[];
  year: string;
  cfu: number;

  constructor(public nav: NavbarService, public courseService: CourseService, public subjectService: SubjectService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.year = String(new Date().getFullYear());
    this.courseService.getAllCourseTypes().subscribe(courseTypes =>{
      this.courseTypes = courseTypes; 
      console.log(this.courseTypes);
    });
    this.courseService.getAllTypes().subscribe(degreeCourseTypes=>{
      this.degreeCourseTypes = degreeCourseTypes;
      console.log(this.degreeCourseTypes);
    });
    
  }


  save(name, academicYear, idcourseType){

    if (!name || !academicYear || (idcourseType==undefined) ){
      alert('Inserisci Dati Corso!');
    }else{
      console.log(idcourseType);
    this.courseService.getCourseType(idcourseType).subscribe(courseType =>{
      this.courseType = courseType;
      console.log(courseType);
    /*  this.courseService.saveCourse({name, academicYear, cfu: courseType.cfu , course} as DegreeCourse).subscribe(course => {
        console.log(course);
        this.nextPage = true;
      });*/
    });
  }
  
  

  }

}
