import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { DegreeCourse } from '../models/DegreeCourse';
import { CourseService } from '../../services/course.service';
import { Subject } from '../models/subject';
import { SubjectofstudyService } from '../../services/subjectofstudy.service';
import { TypeDegreeCourse } from '../models/TypeDegreeCourse';
import { CourseType } from '../models/CourseType';
import { TypeSubject } from '../models/TypeSubject';
import $ from 'jquery'

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
  showSubjects: boolean = false;
  subjects: Subject[];
  typeSubjects: TypeSubject[];
  year: string;
  cfu: number;
  remainingcfus: number;
  selectedSubjects: Subject[] = [];

  constructor(public nav: NavbarService, public courseService: CourseService, public subjectofstudyService: SubjectofstudyService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.year = String(new Date().getFullYear());
    this.courseService.getAllCourseTypes().subscribe(courseTypes =>{
      this.courseTypes = courseTypes; 
      console.log(this.courseTypes);
    });
    this.subjectofstudyService.getAll().subscribe(subjects =>{
      this.subjects = subjects;
    });
  }

  showSubjectList(idcourseType, idtypeDegreeCourse, academicYear){
    if (!academicYear || academicYear == undefined|| idcourseType==undefined || idtypeDegreeCourse == undefined || idtypeDegreeCourse == 0){
      alert('Inserisci Dati Corso!');
    }else{
      this.courseService.getCourseType(idcourseType).subscribe(courseType =>{
        this.courseType = courseType;
        console.log(courseType.cfu);
        this.showSubjects = true;
        this.remainingcfus = courseType.cfu;
      });
    }
  }

  onChange($event, idcourseType) {
    console.log(idcourseType);
      this.courseService.getAllTypes().subscribe(degreeCourseTypes=>{
      this.degreeCourseTypes = degreeCourseTypes.filter(degreeCourseTypes=>degreeCourseTypes.courseType.idcourseType === parseInt(idcourseType));
      console.log(this.degreeCourseTypes);
    });
}

onChange2(s) {
  const index: number = this.selectedSubjects.indexOf(s)
  if(index !== -1) {
    this.selectedSubjects.splice(index, 1);
    this.remainingcfus = this.remainingcfus + s.cfu;
  } else {
    this.selectedSubjects.push(s);
    this.remainingcfus = this.remainingcfus - s.cfu;
  }
  console.log(this.selectedSubjects)
}

save(idcourseType,idtypeDegreeCourse,academicYear,selectedSubjects){
  if (this.remainingcfus !== 0){
    alert('Devi raggiungere un minimo di cfu!');
  }else{
  console.log(idcourseType, idtypeDegreeCourse, academicYear, this.selectedSubjects);
  this.courseService.getTypesById(idtypeDegreeCourse).subscribe(degreeCourseType=>{
    this.degreeCourseType = degreeCourseType;
  
  this.courseService.saveCourse({cfu: this.courseType.cfu, typeDegreeCourse: degreeCourseType, academicYear, subjects: this.selectedSubjects} as DegreeCourse).subscribe(course => {
      console.log(course);
    });
  });
  }
}


}
