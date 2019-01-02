import { Component, OnInit} from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { LessonService } from '../../services/lesson.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild, TemplateRef } from '@angular/core';
import { Lesson } from '../models/Lesson';
import { TypeDegreeCourse } from '../models/TypeDegreeCourse';
import { CourseType } from '../models/CourseType';
import { DegreeCourse } from '../models/DegreeCourse';
import { SubjectStudy } from '../models/SubjectStudy';
import { LessonFile } from '../models/LessonFile';
import { Feedback } from '../models/feedback';
import { DatePipe } from '@angular/common';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../models/exam';
import { ExamEnrollment } from '../models/ExamEnrollment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  originalExams: Exam[];
  currentExams: Exam[] = [];
  courseTypes: CourseType[] = [];
  selectedCourseType: CourseType = undefined;
  degreeCourses: TypeDegreeCourse[] = [];
  selectedDegreeCourse: TypeDegreeCourse = undefined;
  subjects: SubjectStudy[] = [];
  detail: boolean = false;
  exam: Exam;
  feedbackFiles: Feedback[];
  feedbackLesson: Feedback[];
  stars: number;
  selectedSubject: SubjectStudy;
  startDate: Date;
  endDate: Date;
  datePipe = new DatePipe('en-US');
  dateValid: boolean = true;
  valid: boolean = true;
  today: Date;
  enrollmentsResult: ExamEnrollment[];
 
  constructor(public examService: ExamService,  private router: Router, public nav: NavbarService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'teacher') {
        this.nav.showNavTeacher();
      this.examService.getAllAvailableByTeacher(JSON.parse(localStorage.getItem('currentUser')).iduser).subscribe(exams => {
        this.originalExams = exams
        let now = new Date();
        now.setDate(now.getDate() + 7);
        for(let e of exams) {
          if(!this.courseTypes.find(i => i.idcourseType == e.subject.degreecourseDTO.typeDegreeCourse.courseType.idcourseType)) {
            this.courseTypes.push(e.subject.degreecourseDTO.typeDegreeCourse.courseType)
          }        
          this.currentExams.push(e);
          
        }
      })
      } else {
        this.router.navigate(['/staff']);
      }
    } else {
      this.router.navigate(['/']);
    }
    
  }


  onChangeCourseType($event) {
    for(let e of this.originalExams) {
      if(!this.degreeCourses.find(i => i.idtypeDegreeCourse == e.subject.degreecourseDTO.typeDegreeCourse.idtypeDegreeCourse)) {
        if(e.subject.degreecourseDTO.typeDegreeCourse.courseType == this.selectedCourseType) {
          this.degreeCourses.push(e.subject.degreecourseDTO.typeDegreeCourse)
        }
        
      }
    }
    if(this.selectedCourseType == undefined) {
      this.selectedDegreeCourse = undefined;
      this.degreeCourses = [];
      this.selectedSubject = undefined;
      this.subjects = [];
    }
  }

  onChangeDegreeCourse($event) {
    for(let e of this.originalExams) {
      if(!this.subjects.find(i => i.id == e.subject.id)) {
        if(e.subject.degreecourseDTO.typeDegreeCourse == this.selectedDegreeCourse) {
          this.subjects.push(e.subject)
        }
        
      }
    }
    if(this.selectedDegreeCourse == undefined) {
      this.selectedSubject = undefined;
      this.subjects = [];
    }
  }

  onChangeGrade(value, student) {
    console.log(value)
    const index: number = this.enrollmentsResult.findIndex(x => x.student==student);
    
    if(value == 'Ritirato') {
      this.enrollmentsResult[index].result.idresult=5
      this.enrollmentsResult[index].result.description=value;
      this.enrollmentsResult[index].grade = 0;
    } else if(value == 'Assente') {
      this.enrollmentsResult[index].result.idresult=4
      this.enrollmentsResult[index].result.description=value;
      this.enrollmentsResult[index].grade = 0;
    } else if(value == 'Non superato') {
      this.enrollmentsResult[index].result.idresult=3
      this.enrollmentsResult[index].result.description=value;
      this.enrollmentsResult[index].grade = 0;
    } else if(value == '30 e Lode') {
      this.enrollmentsResult[index].result.idresult=2
      this.enrollmentsResult[index].grade=33
      this.enrollmentsResult[index].result.description='Superato';
    } else if(value == 'undefined') {
      this.enrollmentsResult[index].result.idresult=undefined
      this.enrollmentsResult[index].grade=undefined
      this.enrollmentsResult[index].result.description=undefined;
    } else  {
      this.enrollmentsResult[index].result.idresult=2
      this.enrollmentsResult[index].grade = value;
      this.enrollmentsResult[index].result.description='Superato';
    }
    console.log(this.enrollmentsResult)
  }

  showDetail(exam) {
    this.exam = exam;
    this.today = new Date();
    this.enrollmentsResult = exam.enrollments;
    this.detail = true;
  }

  close() {
    this.valid=true;
    for(let e of this.enrollmentsResult) {
      if(e.result.idresult == 1 || e.result.idresult == undefined) {
        this.valid=false;
      }
    }
    if(this.valid) {
      this.examService.insertGrade(this.enrollmentsResult, this.exam.idexam).subscribe(result => {
        this.detail = false;
        this.selectedCourseType = undefined;
        this.selectedDegreeCourse = undefined;
        this.selectedSubject = undefined;
      });
    }
  }

  back() {
    this.detail = false;
  }

  filtra() {
    if(this.startDate != undefined && this.endDate != undefined) {
      if((new Date(this.datePipe.transform(this.startDate, 'yyyy/MM/dd'))) > (new Date(this.datePipe.transform(this.endDate, 'yyyy/MM/dd')))) {
        this.dateValid = false;
      } else {
        this.dateValid == false;
        if(this.selectedCourseType != undefined) {
          this.currentExams = this.currentExams.filter(exam => exam.subject.degreecourseDTO.typeDegreeCourse.idtypeDegreeCourse === this.selectedCourseType.idcourseType);
        }
        if(this.selectedDegreeCourse != undefined) {
          this.currentExams = this.currentExams.filter(exam => exam.subject.degreecourseDTO.idcourse === this.selectedDegreeCourse.idtypeDegreeCourse);
        }
        if(this.selectedSubject != undefined) {
          this.currentExams = this.currentExams.filter(exam => exam.subject.id === this.selectedSubject.id);
        }
        if(this.startDate != undefined) {
          this.currentExams = this.currentExams.filter(exam => (new Date(this.datePipe.transform(exam.date, 'yyyy/MM/dd'))) > (new Date(this.datePipe.transform(this.startDate, 'yyyy/MM/dd'))));
        }
        if(this.endDate != undefined) {
          this.currentExams = this.currentExams.filter(exam => (new Date(this.datePipe.transform(exam.date, 'yyyy/MM/dd'))) < (new Date(this.datePipe.transform(this.endDate, 'yyyy/MM/dd'))));
        }
      }
    } else {
      this.dateValid == false;
      if(this.selectedCourseType != undefined) {
        this.currentExams = this.currentExams.filter(exam => exam.subject.degreecourseDTO.typeDegreeCourse.idtypeDegreeCourse === this.selectedCourseType.idcourseType);
      }
      if(this.selectedDegreeCourse != undefined) {
        this.currentExams = this.currentExams.filter(exam => exam.subject.degreecourseDTO.idcourse === this.selectedDegreeCourse.idtypeDegreeCourse);
      }
      if(this.selectedSubject != undefined) {
        this.currentExams = this.currentExams.filter(exam => exam.subject.id === this.selectedSubject.id);
      }
      if(this.startDate != undefined) {
        this.currentExams = this.currentExams.filter(exam => (new Date(this.datePipe.transform(exam.date, 'yyyy/MM/dd'))) > (new Date(this.datePipe.transform(this.startDate, 'yyyy/MM/dd'))));
      }
      if(this.endDate != undefined) {
        this.currentExams = this.currentExams.filter(exam => (new Date(this.datePipe.transform(exam.date, 'yyyy/MM/dd'))) < (new Date(this.datePipe.transform(this.endDate, 'yyyy/MM/dd'))));
      }
    }
  }

  removeFilter() {
    this.currentExams = this.originalExams;
  }

  updatestart(startdate){
    this.startDate = startdate;
  }

  updateend(enddate){
    this.endDate = enddate;
  }


}


