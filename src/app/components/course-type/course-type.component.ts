import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { CourseService } from '../../services/course.service';
import { CourseType } from '../models/CourseType';
import { TypeDegreeCourse } from '../models/TypeDegreeCourse';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.css']
})
export class CourseTypeComponent implements OnInit {
  courseTypes: CourseType[];
  selectedCourseTypes: CourseType[];

  constructor(public nav: NavbarService, public courseService: CourseService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.courseService.getAllCourseTypes().subscribe(courseTypes =>{
      this.courseTypes = courseTypes; 
      console.log(this.courseTypes);
    });
    
  }

  save(courseType, name){
    if(!courseType || !name){
      alert('Inserisci i dati richiesti!');
    }
    else{
    this.selectedCourseTypes = this.courseTypes.filter(courseTypes=>courseTypes.idcourseType === parseInt(courseType));
    console.log(this.selectedCourseTypes);
      if(this.selectedCourseTypes.length===0){
        alert("Scegli un tipo di corso!")
      }
      else{
      this.courseService.saveType({name: name, courseType: this.selectedCourseTypes[0]} as TypeDegreeCourse).subscribe(type => {
        alert('Tipo di Corso salvato con successo!');
      })
  }
  }
  }

}
