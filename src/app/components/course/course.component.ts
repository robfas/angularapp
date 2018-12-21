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
import { AcademicYearService } from '../../services/academic-year.service';
import { Router } from '@angular/router';

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
  year: number;
  years: number;
  academicyears: AcademicYear[];
  cfu: number;
  remainingcfus: number;
  selectedSubjects: TypeSubject[] = [];
  academicYear: AcademicYear;
  terms: Term[];
  term: Term;
  teachers: Teacher[];
  selectedTeacher: Teacher[] = [];
  selectedTerm: Term[] = [];
  aa: AcademicYear[];
  myteachers: Teacher[]
  myterms: Term[];
  mysubject: SubjectStudy;
  mysubjects: SubjectStudy[] = [];

  constructor(public nav: NavbarService, private router: Router, public courseService: CourseService, public academicYearService: AcademicYearService, public userService: UserService, public subjectService: SubjectService) { }

  ngOnInit() {
    this.nav.showNavStaff();
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
    this.academicYearService.getAllYears().subscribe(academicyears =>{
      this.academicyears = academicyears;
      console.log(this.academicyears);
  });
  }

  onchange(year){
    this.years = parseInt(year)+1;
  }

  showSubjectList(idcourseType, idtypeDegreeCourse, academicYear){
    if (!academicYear || academicYear == undefined|| idcourseType==undefined || idtypeDegreeCourse == undefined || idtypeDegreeCourse == 0){
      alert('Inserisci Dati Corso!');
    }else{
      console.log(academicYear)
      this.courseService.getCourseType(idcourseType).subscribe(courseType =>{
        this.courseType = courseType;

      this.courseService.getTypesById(idtypeDegreeCourse).subscribe(degreeCourseType=>{
        this.degreeCourseType = degreeCourseType;

      this.academicYearService.getAllYears().subscribe(aa=>{
        this.aa = aa.filter(aa=>aa.idacademicYear == academicYear);
        console.log(this.aa[0])
        
      this.academicYearService.getTermsByAA(academicYear).subscribe(terms=>{
        this.terms = terms;
        console.log(terms)
      /*this.courseService.saveCourse({cfu: courseType.cfu, typeDegreeCourse: degreeCourseType, academicYear: this.aa[0]} as DegreeCourse).subscribe(course => {
          console.log(course);
        });*/
      });
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

add(s, cfu, teacher, period, mysubject) {
  if(!cfu || cfu == undefined){
    alert('Inserisci numero di cfu!');
  }
  else{
  console.log(s);
  const index: number = this.selectedSubjects.indexOf(s)  
  this.selectedSubjects.push(s);

  this.myteachers = this.teachers.filter(teachers=>teachers.idteacher == parseInt(teacher))
  console.log(this.myteachers);
  this.myterms= this.terms.filter(terms=>terms.idterm === parseInt(period))
  console.log(this.myterms);
  
  this.mysubject={
    name: this.selectedSubjects[0].name,
    teacherDTO: this.myteachers[0],
    typeSubjectDTO: this.selectedSubjects[0],
    cfu: cfu,
    description: this.selectedSubjects[0].description,
    term: this.myterms[0]
    }
  this.mysubjects.push(this.mysubject);
  this.mysubject = {}; 
  this.selectedSubjects = [];
  this.remainingcfus = this.remainingcfus - cfu;
  
  console.log(this.mysubjects);
  }
}

remove(s, cfu, remainingcfus) {
  let item = this.mysubjects.find(i => i.typeSubjectDTO === s);
  const index: number = this.mysubjects.indexOf(item)
  if(index !== -1){
  console.log(index);
  this.mysubjects.splice(index, 1);
  
  this.remainingcfus = this.remainingcfus + parseInt(cfu);
  
  console.log(this.mysubjects);
  }
  else alert('Materia già rimossa');
}

save(idcourseType,idtypeDegreeCourse,academicyear,mysubjects){
  if (this.remainingcfus !== 0){
    alert('Il numero di cfu rimanenti deve essere pari a 0!');
  }else{
  console.log(idcourseType, idtypeDegreeCourse, academicyear,this.mysubjects);
  this.courseService.getTypesById(idtypeDegreeCourse).subscribe(degreeCourseType=>{
    this.degreeCourseType = degreeCourseType;
    
  
  
  /*for(let i in this.mysubjects){
    this.mysubjects[i].degreecourseDTO.idcourse = course.idcourse;
  }
  console.log(this.mysubjects);*/

  this.courseService.saveCourse({cfu: this.courseType.cfu, typeDegreeCourse: this.degreeCourseType, academicYear: this.aa[0], subjects: this.mysubjects} as DegreeCourse).subscribe(course => {
    console.log(course);
    alert('Corso salvato con successo!');
    this.router.navigate(['staff']);
 /* this.subjectService.saveAllSubject(this.mysubjects).subscribe(subjects => {
      console.log(subjects);
    });

  /*this.courseService.saveCourse({cfu: this.courseType.cfu, typeDegreeCourse: this.degreeCourseType, academicYear: this.aa[0], subjects: this.subjects} as DegreeCourse).subscribe(course => {
      console.log(course);

      /*this.courseService.saveCourse({cfu: courseType.cfu, typeDegreeCourse: degreeCourseType, academicYear: this.aa[0]} as DegreeCourse).subscribe(course => {
          console.log(course);
        });*/
    });
  });
  
  }
}


}
