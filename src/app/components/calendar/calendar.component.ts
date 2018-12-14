import { Component, OnInit} from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { DegreeCourse } from '../models/DegreeCourse';
import { CourseService } from '../../services/course.service';
import { SubjectStudy } from '../models/subjectstudy';
import { SubjectService } from '../../services/subject.service';
import { TypeDegreeCourse } from '../models/TypeDegreeCourse';
import { CourseType } from '../models/CourseType';
import { TypeSubject } from '../models/TypeSubject';
import { TermService } from '../../services/term.service';
import { Term } from '../models/term';
import { SchoolCalendar2Component } from '../school-calendar2/school-calendar2.component';

import { ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from '../../services/classroom.service';
import { Class } from '../models/Class';
import { CalendarDateFormatter, DateFormatterParams,  DAYS_OF_WEEK } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { BuildingService } from '../../services/building.service';
import { AcademicYearService } from '../../services/academic-year.service';
import { Building } from '../models/Building';
import { TypeLesson } from '../models/TypeLesson';
import { Scheduler } from '../models/scheduler';
import { AcademicYear } from '../models/AcademicYear';
import { Day } from '../models/day';

export class CustomDateFormatter extends CalendarDateFormatter {
  // you can override any of the methods defined in the parent class

  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'EEEE', locale);
  }

  public weekViewColumnSubHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, ' ', locale);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH:mm', locale);
  }
}

interface MyEvent extends CalendarEvent {
  room: Class;
  subject: SubjectStudy;
}

interface MySubject extends SubjectStudy {
  color: any;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {
  course: DegreeCourse;
  courses: DegreeCourse[];
  terms: Term[];
  degreeCourseType: TypeDegreeCourse;
  degreeCourseTypes: TypeDegreeCourse[];
  courseType: CourseType;
  courseTypes: CourseType[];
  error: boolean = false;
  subjectofstudies: SubjectStudy[];
  showSubjects: boolean = false;
  schedule: boolean = false;
  subjects: SubjectStudy[];
  typeSubjects: TypeSubject[];
  year: string;
  cfu: number;
  remainingcfus: number;
  selectedSubjects: SubjectStudy[] = [];
  mySubjects: MySubject[] = [];
  sub: MySubject;
  buildings: Building[];
  classes: Class[] = [];
  classroom: Class;
  selectedClassroom: Class;
  valid: Boolean = true;
  selectedIdcourseType: number;
  selectedIdtypeDegreeCourse: number;
  selectedIdCourse: number;
  selectedTerm: number;
  aa: AcademicYear[];

  constructor(private modal: NgbModal, public aaService: AcademicYearService, public subjectService: SubjectService, private route: ActivatedRoute, public buildingService: BuildingService, public classroomService: ClassroomService, public nav: NavbarService, public courseService: CourseService, public termService: TermService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.year = String(new Date().getFullYear());
    this.courseService.getAllCourseTypes().subscribe(courseTypes =>{
      this.courseTypes = courseTypes; 
    });
    this.subjectService.getAll().subscribe(subjects =>{
      this.subjects = subjects;
    });
  }

  onChange($event, idcourseType) {
      this.courseService.getAllTypes().subscribe(degreeCourseTypes=>{
      this.degreeCourseTypes = degreeCourseTypes.filter(degreeCourseTypes=>degreeCourseTypes.courseType.idcourseType === parseInt(idcourseType));
      console.log(this.degreeCourseTypes);
    });
    this.courses = null
    this.terms = null
}

onChangeTypeCourse($event, idtypeDegreeCourse) {
    this.courseService.getAllCourseByType(idtypeDegreeCourse).subscribe(courses=>{
    this.courses = courses;
    
    for(let c of this.courses) {
      c.name = c.name + " " + c.academicYear.year + "/" + (c.academicYear.year+1);
    }
  });
  this.terms = null
}

onChangeCourse($event, idDegreeCourse) {
console.log('yep')
this.aaService.getAllYearsOfCourse(idDegreeCourse).subscribe(aa =>{
  this.aa=aa
  console.log(this.aa)
  });
}

onChangeYear($event, idYear) {
  this.termService.getTermByAcademicYearId(idYear).subscribe(terms =>{
    this.terms = terms;
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
}

showScheduler(idcourseType, idtypeDegreeCourse, course, term){
  if (term == undefined || course == undefined|| idcourseType==undefined || idtypeDegreeCourse == undefined){
    alert('Completa tutti i campi!');
  }else{
    this.selectedTerm = term;
    this.selectedIdCourse = course;
    this.selectedIdcourseType = idcourseType;
    this.selectedIdtypeDegreeCourse = idtypeDegreeCourse;
    this.subjectService.getByIdCourse(course).subscribe(subjects =>{
      this.subjects = subjects;
      for(let s in this.subjects) {
        const colore: any = this.getRandomColor()
        this.mySubjects.push({
          id: this.subjects[s].id,
          name: this.subjects[s].name,
          color: {
            primary: colore,
            secondary: colore
          }
        });
      }
      this.refresh.next();
    });
    this.buildingService.getBuildings().subscribe(buildings => {
      this.buildings = buildings;
      this.refresh.next();
    });
    this.schedule = true;
  }
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date(2017, 4, 1)

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  

  events: MyEvent[] = [
    /*{
      start: new Date(2017, 4, 1, 15, 30),
      end: new Date(2017, 4, 1, 17, 30),
      title: 'A draggable and resizable event',
      id: 999,
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      room: null,
      subject: null
    }*/
  ];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    //this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: any): void {
    const datePipe = new DatePipe('en-US');
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    if(event.room != undefined) {
      this.classroomService.getClassroomsByBuilding(event.room.building.id).subscribe(classes => {
        this.classes = classes;
        this.refresh.next();
      });
    }
    /*console.log(event.id)
    console.log(datePipe.transform(event.start, 'd'))
    console.log(datePipe.transform(event.start, 'HH:mm'))
    console.log(datePipe.transform(event.end, 'd'))
    console.log(datePipe.transform(event.end, 'HH:mm'))*/
  }

  addEvent2(s): void {
    console.log(s.color)
    const datePipe = new DatePipe('en-US');
    this.events.push({
      title: s.name,
      id: s.id,
      start: new Date(2017, 4, 1, 8, 0),
      end: new Date(2017, 4, 1, 9, 0),
      color: s.color,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      room: null,
      subject: s
    });
    this.refresh.next();
  }

  /*addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      room: null,
      subject: null
    });
    this.refresh.next();
  }*/

  onChangeBuild($event, index, event) {
    if(index != "") {
      /*this.classroomService.getClassroomsByBuilding(this.buildings[index].id).subscribe(classes => {
        this.classes = classes;
        this.refresh.next();
      });*/
      const datePipe = new DatePipe('en-US');
      const s: Scheduler = {};
     const aa: AcademicYear = {idacademicYear: 1};
     const d: Day = {idDay: 1};
      const ter: Term = {idterm: 1};
      ter.academicYear=aa
      s.term=ter

      console.log(this.buildings[index].id, {id: 1, scheduler: s, start: event.start, end: event.end, day: d} as TypeLesson)

      this.classroomService.getAvailableClassrooms(this.buildings[index].id, {id: 1, scheduler: s, start: event.start, end: event.end, day: d} as TypeLesson).subscribe(classes => {
        this.classes = classes;
        this.refresh.next();
      });
      
      /*console.log(event.id)
    console.log(datePipe.transform(event.start, 'd'))
    console.log(datePipe.transform(event.start, 'HH:mm'))
    console.log(datePipe.transform(event.end, 'd'))
    console.log(datePipe.transform(event.end, 'HH:mm'))*/
    } else {
      this.selectedClassroom = null
      this.classes = null
    }
  }
  save(event: MyEvent) {
    if(this.selectedClassroom != null) {
        event.room = this.selectedClassroom;
        event.title = event.subject.name + " - " + this.selectedClassroom.building.name + ", " + this.selectedClassroom.name,
        console.log(this.events)
        this.selectedClassroom = null

        this.modal.dismissAll('success')
        this.valid = true;
        this.refresh.next();
    } else {
      this.valid = false;
      console.log('error')
    }
    
  }

  onChangeClass($event, index) {
    if(index != "") {
      this.selectedClassroom = this.classes[index]
    } else {
      this.selectedClassroom = null
    }
    this.refresh.next();
  }

  back() {
    this.schedule = false;
    this.mySubjects = [];
    this.events = [];
  }

  saveScheduler() {
    console.log(this.events)
    if (this.events.length ==  0) {
      console.log("err")
      this.error=true;
    } else {
      for(let e in this.events) {
        if (this.events[e].room == undefined) {
          this.error = true;
          console.log("err")
          break;
        } else if(Number(e) == this.events.length-1) {
          this.error = false;
        }
      }
      if(this.error == false) {
        console.log("ok")
      }
    }

  }
}
