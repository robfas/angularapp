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
  
 
  constructor(private modal: NgbModal, public lessonService: LessonService, public nav: NavbarService) { }

  ngOnInit() {
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
  }

  onChange($event) {
    for(let l of this.originalLessons) {
      if(!this.degreeCourses.find(i => i.idtypeDegreeCourse == l.typeLesson.subject.degreecourseDTO.typeDegreeCourse.idtypeDegreeCourse)) {
        if(l.typeLesson.subject.degreecourseDTO.typeDegreeCourse.courseType == this.selectedCourseType) {
          this.degreeCourses.push(l.typeLesson.subject.degreecourseDTO.typeDegreeCourse)
        }
        
      }
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
  }

}


