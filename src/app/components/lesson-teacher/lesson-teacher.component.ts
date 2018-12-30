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
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-teacher',
  templateUrl: './lesson-teacher.component.html',
  styleUrls: ['./lesson-teacher.component.css']
})
export class LessonTeacherComponent implements OnInit {
  originalLessons: Lesson[];
  currentLessons: Lesson[] = [];
  courseTypes: CourseType[] = [];
  selectedCourseType: CourseType = undefined;
  degreeCourses: TypeDegreeCourse[] = [];
  selectedDegreeCourse: TypeDegreeCourse = undefined;
  subjects: SubjectStudy[] = [];
  detail: boolean = false;
  lesson: Lesson;
  feedbackFiles: Feedback[];
  feedbackLesson: Feedback[];
  stars: number;
  selectedSubject: SubjectStudy;
  startDate: Date;
  endDate: Date;
  datePipe = new DatePipe('en-US');
  dateValid: boolean = true;
 
  constructor(private modal: NgbModal, private router: Router, public lessonService: LessonService, public nav: NavbarService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'teacher') {
        this.nav.showNavTeacher();
      this.lessonService.getAllTeacherLessons(JSON.parse(localStorage.getItem('currentUser')).iduser).subscribe(lessons => {
        this.originalLessons = lessons
        let now = new Date();
        now.setDate(now.getDate() + 7);
        for(let l of lessons) {
          if(!this.courseTypes.find(i => i.idcourseType == l.typeLesson.subject.degreecourseDTO.typeDegreeCourse.courseType.idcourseType)) {
            this.courseTypes.push(l.typeLesson.subject.degreecourseDTO.typeDegreeCourse.courseType)
          }        
          if(l.start<=now) {
            this.currentLessons.push(l);
          }
        }
      })
      } else {
        this.router.navigate(['/staff']);
      }
    } else {
      this.router.navigate(['/']);
    }
    
  }

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  modalData: {
    file: LessonFile;
    feedbacks: Feedback[];
  };


  onChangeCourseType($event) {
    for(let l of this.originalLessons) {
      if(!this.degreeCourses.find(i => i.idtypeDegreeCourse == l.typeLesson.subject.degreecourseDTO.typeDegreeCourse.idtypeDegreeCourse)) {
        if(l.typeLesson.subject.degreecourseDTO.typeDegreeCourse.courseType == this.selectedCourseType) {
          this.degreeCourses.push(l.typeLesson.subject.degreecourseDTO.typeDegreeCourse)
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
    for(let l of this.originalLessons) {
      if(!this.subjects.find(i => i.id == l.typeLesson.subject.id)) {
        if(l.typeLesson.subject.degreecourseDTO.typeDegreeCourse == this.selectedDegreeCourse) {
          this.subjects.push(l.typeLesson.subject)
        }
        
      }
    }
    if(this.selectedDegreeCourse == undefined) {
      this.selectedSubject = undefined;
      this.subjects = [];
    }
  }

  showDetail(lesson) {
    this.lesson = lesson;
    console.log(this.lesson)
    this.lessonService.getLessonFiles(lesson.idlesson).subscribe(files => {
      this.lesson.lessonFiles = files;
    });
    this.lessonService.getFeedback(lesson.idlesson).subscribe(feedbacks => {
      this.feedbackLesson = feedbacks;
      let sum: number = 0;
      for(let f of feedbacks) {
        sum += f.stars;
      }
      this.stars = sum/feedbacks.length
    })
    this.detail = true;
  }

  back() {
    this.detail = false;
  }

  onFileChanged(event) {
    for(let f of event.target.files) {
      this.lessonService.saveLessonFiles(f, this.lesson.idlesson).subscribe(file => {
        this.lesson.lessonFiles.push(file)
      });
    }
  }

  showFile(file) {
    this.lessonService.getFeedbackFiles(file.idFile).subscribe(feedbacks => {
      this.feedbackFiles = feedbacks;
      this.modalData = { file, feedbacks };
      this.modal.open(this.modalContent, { size: 'lg' });
    })
    
  }

  filtra() {
    if(this.startDate != undefined && this.endDate != undefined) {
      if((new Date(this.datePipe.transform(this.startDate, 'yyyy/MM/dd'))) > (new Date(this.datePipe.transform(this.endDate, 'yyyy/MM/dd')))) {
        this.dateValid = false;
      } else {
        this.dateValid == false;
        if(this.selectedCourseType != undefined) {
          this.currentLessons = this.currentLessons.filter(lesson => lesson.typeLesson.subject.degreecourseDTO.typeDegreeCourse.idtypeDegreeCourse === this.selectedCourseType.idcourseType);
        }
        if(this.selectedDegreeCourse != undefined) {
          this.currentLessons = this.currentLessons.filter(lesson => lesson.typeLesson.subject.degreecourseDTO.idcourse === this.selectedDegreeCourse.idtypeDegreeCourse);
        }
        if(this.selectedSubject != undefined) {
          this.currentLessons = this.currentLessons.filter(lesson => lesson.typeLesson.subject.id === this.selectedSubject.id);
        }
        if(this.startDate != undefined) {
          this.currentLessons = this.currentLessons.filter(lesson => (new Date(this.datePipe.transform(lesson.start, 'yyyy/MM/dd'))) > (new Date(this.datePipe.transform(this.startDate, 'yyyy/MM/dd'))));
        }
        if(this.endDate != undefined) {
          this.currentLessons = this.currentLessons.filter(lesson => (new Date(this.datePipe.transform(lesson.end, 'yyyy/MM/dd'))) < (new Date(this.datePipe.transform(this.endDate, 'yyyy/MM/dd'))));
        }
      }
    } else {
      this.dateValid == false;
      if(this.selectedCourseType != undefined) {
        this.currentLessons = this.currentLessons.filter(lesson => lesson.typeLesson.subject.degreecourseDTO.typeDegreeCourse.idtypeDegreeCourse === this.selectedCourseType.idcourseType);
      }
      if(this.selectedDegreeCourse != undefined) {
        this.currentLessons = this.currentLessons.filter(lesson => lesson.typeLesson.subject.degreecourseDTO.idcourse === this.selectedDegreeCourse.idtypeDegreeCourse);
      }
      if(this.selectedSubject != undefined) {
        this.currentLessons = this.currentLessons.filter(lesson => lesson.typeLesson.subject.id === this.selectedSubject.id);
      }
      if(this.startDate != undefined) {
        this.currentLessons = this.currentLessons.filter(lesson => (new Date(this.datePipe.transform(lesson.start, 'yyyy/MM/dd'))) > (new Date(this.datePipe.transform(this.startDate, 'yyyy/MM/dd'))));
      }
      if(this.endDate != undefined) {
        this.currentLessons = this.currentLessons.filter(lesson => (new Date(this.datePipe.transform(lesson.end, 'yyyy/MM/dd'))) < (new Date(this.datePipe.transform(this.endDate, 'yyyy/MM/dd'))));
      }
    }
  }

  removeFilter() {
    this.currentLessons = this.originalLessons;
  }

  updatestart(startdate){
    this.startDate = startdate;
  }

  updateend(enddate){
    this.endDate = enddate;
  }


}


