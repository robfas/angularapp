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
  showremove: boolean;

  constructor(public nav: NavbarService, private router: Router, public courseService: CourseService, public academicYearService: AcademicYearService, public userService: UserService, public subjectService: SubjectService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'employee') {
        this.nav.showNavStaff();
        this.courseService.getAllCourseTypes().subscribe(courseTypes =>{
          this.courseTypes = courseTypes; 
        });
        this.subjectService.getAllSubjectTypes().subscribe(typeSubjects =>{
          this.typeSubjects = typeSubjects;
        });
        this.userService.getAllTeachers().subscribe(teachers =>{
          this.teachers = teachers;
        });
        this.academicYearService.getAllYears().subscribe(academicyears =>{
          this.academicyears = academicyears;
      });
     
      } else {
        this.router.navigate(['/teacher']);
      }
    } else {
      this.router.navigate(['/']);
    }
    
  }

  onchange(year){
    this.years = parseInt(year)+1;
  }

  showSubjectList(idcourseType, idtypeDegreeCourse, academicYear){
    if (!academicYear || academicYear == undefined|| idcourseType==undefined || idtypeDegreeCourse == undefined || idtypeDegreeCourse == 0){
      alert('Inserisci Dati Corso!');
    }else{
      this.courseService.getCourseType(idcourseType).subscribe(courseType =>{
        this.courseType = courseType;

      this.courseService.getTypesById(idtypeDegreeCourse).subscribe(degreeCourseType=>{
        this.degreeCourseType = degreeCourseType;

      this.academicYearService.getAllYears().subscribe(aa=>{
        this.aa = aa.filter(aa=>aa.idacademicYear == academicYear);
        
      this.academicYearService.getTermsByAA(academicYear).subscribe(terms=>{
        this.terms = terms;
      });
    });
  }); 
        this.showSubjects = true;
        this.remainingcfus = courseType.cfu;
      
      });
    }
  }

  onChange($event, idcourseType) {
      this.courseService.getAllTypes().subscribe(degreeCourseTypes=>{
      this.degreeCourseTypes = degreeCourseTypes.filter(degreeCourseTypes=>degreeCourseTypes.courseType.idcourseType === parseInt(idcourseType));
    });
}

add(s, cfu, teacher, period, mysubject) {
  if(!cfu || cfu == undefined || !teacher || teacher == undefined || !period || period == undefined){
    alert('Compila tutti i campi!');
  }
  else if(this.remainingcfus - cfu < 0) {
    alert('Numero di Cfu superato!');
  }
  else{

  let index = this.mysubjects.findIndex(item => item.typeSubjectDTO.idtypeSubject == s.idtypeSubject);
  if(index == -1) {
    this.selectedSubjects.push(s);

    this.myteachers = this.teachers.filter(teachers=>teachers.idteacher == parseInt(teacher))

    this.myterms= this.terms.filter(terms=>terms.idterm === parseInt(period))

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
    
  } else {
    alert('Materia già aggiunta')
  }
  
  }
}

check(s) {
  let index = this.mysubjects.findIndex(item => item.typeSubjectDTO.idtypeSubject == s.idtypeSubject);
  if(index == -1) {
    return false
  } else {
    return true
  }

}

remove(s, cfu, remainingcfus) {
  let item = this.mysubjects.find(i => i.typeSubjectDTO === s);
  const index: number = this.mysubjects.indexOf(item)
  if(index !== -1){
  this.mysubjects.splice(index, 1);
  
  this.remainingcfus = this.remainingcfus + parseInt(cfu);
 
  }
  else alert('Materia già rimossa');
}

save(idcourseType,idtypeDegreeCourse,academicyear,mysubjects){
  if (this.remainingcfus !== 0){
    alert('Il numero di cfu rimanenti deve essere pari a 0!');
  }else{
  this.courseService.getTypesById(idtypeDegreeCourse).subscribe(degreeCourseType=>{
    this.degreeCourseType = degreeCourseType;
    
  
  


  this.courseService.saveCourse({cfu: this.courseType.cfu, typeDegreeCourse: this.degreeCourseType, academicYear: this.aa[0], subjects: this.mysubjects} as DegreeCourse).subscribe(course => {
    alert('Corso salvato con successo!');
    this.router.navigate(['staff']);

    });
  });
  
  }
}


}
