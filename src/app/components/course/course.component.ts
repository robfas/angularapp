import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { DegreeCourse } from '../models/DegreeCourse';
import { CourseService } from '../../services/course.service';
import { SubjectStudy } from '../models/subjectstudy';
import { SubjectService } from '../../services/subject.service';
import { TypeDegreeCourse } from '../models/TypeDegreeCourse';
import { CourseType } from '../models/CourseType';
import { TypeSubject } from '../models/TypeSubject';
import { AcademicYear } from '../models/AcademicYear';
import { Term } from '../models/Term';
import { Teacher } from '../models/Teacher';
import { UserService } from '../../services/user.service';

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
  showSubjects: boolean = false;
  subjects: SubjectStudy[];
  typeSubjects: TypeSubject[];
  actualyear: string;
  year: string;
  acadyear: string;
  cfu: number;
  remainingcfus: number;
  selectedSubjects: SubjectStudy[] = [];
  academicYear: AcademicYear;
  terms: Term[];
  term: Term;
  teachers: Teacher[];
  selectedTeacher: Teacher[];

  constructor(public nav: NavbarService, public courseService: CourseService, public userService: UserService, public subjectService: SubjectService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.actualyear = String(new Date().getFullYear());
    this.year = String(parseInt(this.actualyear)+1);
    this.acadyear = String(parseInt(this.actualyear)+2);
    this.courseService.getAllCourseTypes().subscribe(courseTypes =>{
      this.courseTypes = courseTypes; 
      console.log(this.courseTypes);
    });
    this.subjectService.getAllSubjectTypes().subscribe(typeSubjects =>{
      this.typeSubjects = typeSubjects;
      console.log(this.typeSubjects);
    });
    this.userService.getAllTeachers().subscribe(teachers =>{
      this.teachers = teachers;
    });
  }

  showSubjectList(idcourseType, idtypeDegreeCourse, academicYear){
    if (!academicYear || academicYear == undefined|| idcourseType==undefined || idtypeDegreeCourse == undefined || idtypeDegreeCourse == 0){
      alert('Inserisci Dati Corso!');
    }else{
      this.courseService.getCourseType(idcourseType).subscribe(courseType =>{
        this.courseType = courseType;

      this.courseService.getTypesById(idtypeDegreeCourse).subscribe(degreeCourseType=>{
        this.degreeCourseType = degreeCourseType;
      
      this.courseService.saveCourse({cfu: courseType.cfu, typeDegreeCourse: degreeCourseType, academicYear: this.academicYear} as DegreeCourse).subscribe(course => {
          console.log(course);
        });
      });
     
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

onChange2(s, cfu) {
  console.log(s);
  const index: number = this.selectedSubjects.indexOf(s)
  if(index !== -1) {
    this.selectedSubjects.splice(index, 1);
    this.remainingcfus = this.remainingcfus + cfu;
  } else {
    this.selectedSubjects.push(s);
    this.remainingcfus = this.remainingcfus - cfu;
  }
  console.log(this.selectedSubjects)
}

save(idcourseType,idtypeDegreeCourse,academicyear,selectedSubjects,teacher){
  if (this.remainingcfus !== 0){
    alert('Il numero di cfu rimanenti deve essere pari a 0!');
  }else{
  console.log(idcourseType, idtypeDegreeCourse, academicyear,this.selectedSubjects);
  this.courseService.getTypesById(idtypeDegreeCourse).subscribe(degreeCourseType=>{
    this.degreeCourseType = degreeCourseType;
  
  this.courseService.saveCourse({cfu: this.courseType.cfu, typeDegreeCourse: degreeCourseType, academicYear: this.academicYear, subjects: this.selectedSubjects} as DegreeCourse).subscribe(course => {
      console.log(course);
    });
  });
  }
}

saveSubject(s, teacher, cfu, academicyear){
  console.log(s);
  if (s==undefined || teacher== undefined || cfu == undefined || academicyear == undefined){
    alert('Insersci tutti i valori!');
  }else{
    console.log(s);
    this.selectedTeacher = this.teachers.filter(teachers=>teachers.idteacher === parseInt(teacher));
    this.subjectService.saveSubject({name: s.name, teacherDTO: this.selectedTeacher[0], cfu: cfu, typeSubjectDTO: s} as SubjectStudy).subscribe(subject => {
      console.log(subject);
    });
  

  }
}


}
