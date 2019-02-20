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
import { CalendarService } from '../../services/calendar.service';
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
import { ExamService } from '../../services/exam.service';
import { ExamType } from '../models/ExamType';
import { Exam } from '../models/exam';
import { Router } from '@angular/router';

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
  examType: ExamType;
  present: boolean;
}

interface MySubject extends SubjectStudy {
  color?: any;
}

@Component({
  selector: 'app-exam-calendar',
  templateUrl: './exam-calendar.component.html',
  styleUrls: ['./exam-calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class ExamCalendarComponent implements OnInit {
  locale: string = 'it';
  courses: DegreeCourse[];
  terms: Term[];
  degreeCourseTypes: TypeDegreeCourse[];
  courseTypes: CourseType[];
  error: boolean = false;
  schedule: boolean = false;
  subjects: SubjectStudy[];
  colorSubject: MySubject;
  year: string;
  selectedSubjects: SubjectStudy[] = [];
  mySubjects: MySubject[] = [];
  buildings: Building[];
  classes: Class[] = [];
  selectedClassroom: Class;
  valid: Boolean = true;
  aa: AcademicYear[];
  scheduler: Scheduler;
  datePipe = new DatePipe('en-US');
  selectedCourseType: CourseType = undefined;
  selectedTypeDegreeCourse: TypeDegreeCourse= undefined;
  selectedCourse: DegreeCourse = undefined;
  selectedYear: AcademicYear = undefined;
  selectedTerm: Term = undefined;
  selectedTypeLessons: TypeLesson[] = [];
  selectedSubject: MySubject = {};
  selectedExamType: ExamType = {};
  selectedTime: String;
  examTypes: ExamType[] = [];
  selectedExams: Exam[] = [];

  constructor(private modal: NgbModal, private router: Router, public aaService: AcademicYearService, public examService: ExamService, public subjectService: SubjectService, private route: ActivatedRoute, public buildingService: BuildingService, public classroomService: ClassroomService, public calendarService: CalendarService, public nav: NavbarService, public courseService: CourseService, public termService: TermService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'employee') {
        this.nav.showNavStaff();
        this.year = String(new Date().getFullYear());
        this.courseService.getAllCourseTypes().subscribe(courseTypes =>{
          this.courseTypes = courseTypes; 
        });
        this.subjectService.getAll().subscribe(subjects =>{
          this.subjects = subjects;
        });

        this.examService.getAllExamTypes().subscribe(examTypes => {
          this.examTypes = examTypes
        })
      } else {
        this.router.navigate(['/teacher']);
    }
   } else {
    this.router.navigate(['/']);
    }
    
  }

  onChange($event) {
    if(this.selectedCourseType == undefined) {
      this.degreeCourseTypes = null
      this.courses = null
      this.aa = null
      this.terms = null
      this.selectedTypeDegreeCourse = undefined
      this.selectedCourse = undefined;
      this.selectedYear = undefined;
      this.selectedTerm = undefined;
    } else {
      this.courseService.getAllTypes().subscribe(degreeCourseTypes=>{
        this.degreeCourseTypes = degreeCourseTypes.filter(degreeCourseTypes=>degreeCourseTypes.courseType.idcourseType === parseInt(this.selectedCourseType.idcourseType.toString()));
      });
    }
      
    
}

onChangeTypeCourse($event) {
  if(this.selectedTypeDegreeCourse == undefined) {
    this.courses = null
    this.aa = null
    this.terms = null
    this.selectedCourse = undefined;
    this.selectedYear = undefined;
    this.selectedTerm = undefined;
  } else {
    this.courseService.getAllCourseByType(this.selectedTypeDegreeCourse.idtypeDegreeCourse).subscribe(courses=>{
      this.courses = courses;
      
      for(let c of this.courses) {
        c.name = c.name + " " + c.academicYear.year + "/" + (c.academicYear.year+1);
      }
    });
  }
}

onChangeCourse($event) {
  if(this.selectedCourse == undefined) {
    this.aa = null
    this.terms = null
    this.selectedYear = undefined;
    this.selectedTerm = undefined;
    this.mySubjects = [];
  } else {
    this.aaService.getAllYearsOfCourse(this.selectedCourse.idcourse).subscribe(aa =>{
      this.aa=aa
    });
    this.subjectService.getByIdCourse(this.selectedCourse.idcourse).subscribe(subjects =>{
      this.subjects = subjects;
      for(let s in this.subjects) {
        const colore: any = this.getRandomColor()
        this.mySubjects.push({
          id: this.subjects[s].id,
          name: this.subjects[s].name,
          typeSubjectDTO: this.subjects[s].typeSubjectDTO,
          color: {
            primary: colore,
            secondary: colore
          }
        });
      }
    });
  }

}

onChangeYear($event) {
  if(this.selectedYear == undefined) {
    this.terms = null
    this.selectedTerm = undefined;
  } else {
    this.termService.getTermByAcademicYearId(this.selectedYear.idacademicYear).subscribe(terms =>{
      this.terms = terms;
    });
  }
  
  }

onChange2(s) {
  const index: number = this.selectedSubjects.indexOf(s)
  if(index !== -1) {
    this.selectedSubjects.splice(index, 1);
    //this.remainingcfus = this.remainingcfus + s.cfu;
  } else {
    this.selectedSubjects.push(s);
    //this.remainingcfus = this.remainingcfus - s.cfu;
  }
}

showScheduler(){
  if (this.selectedTypeDegreeCourse == undefined || this.selectedCourse == undefined || this.selectedYear == undefined || this.selectedTerm == undefined) {
    alert('Completa tutti i campi!');
  }else{
        this.examService.getAllByCourseAndTerm(this.selectedCourse.idcourse, this.selectedTerm.idterm).subscribe(exams =>{
          if(exams.length > 0) {
            this.viewDate = exams[0].date
            for (let e of exams) {
              let item = this.mySubjects.find(i => i.id == e.subject.id);
                this.events.push({
                  start: e.date,
                  title: e.examtype.description + " di " + e.subject.name + " in " + e.classroom.building.name + " - " + e.classroom.name + " ore: " + this.datePipe.transform(e.date, 'HH:mm'),
                  id: e.idexam,
                  color: item.color,
                  actions: this.actionsLimited,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: true,
                  room: e.classroom,
                  subject: e.subject,
                  examType: e.examtype,
                  present: true
                })
          }
          } else {
            this.viewDate = this.selectedTerm.start;
          }
          
          
          this.refresh.next();
        })

        

        this.scheduler = {
          degreeCourse: this.selectedCourse,
          term: this.selectedTerm
        }

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

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date()

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

  actionsLimited: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
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

  activeDayIsOpen: boolean = false;


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
    this.activeDayIsOpen = false;
    //this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: any): void {
    if (action == 'Clicked') {
      this.selectedSubject = {};
      this.selectedExamType = {};
      this.selectedClassroom = null;
      this.selectedTime = null;
      if (isSameMonth(event.start, this.viewDate)) {
        this.viewDate = event.start;
        if (
          (isSameDay(this.viewDate, event.start) && this.activeDayIsOpen === true) ||
          this.events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
      }
    } else if (action == 'Edited') {
      this.selectedSubject = event.subject;
      this.selectedExamType = event.examType;
      this.selectedClassroom = event.room;
      this.selectedTime = this.datePipe.transform(event.start, 'HH:mm');
      this.classroomService.getClassroomsByBuilding(event.room.building.id).subscribe(classes => {
        this.classes = classes;
        this.refresh.next();
      });
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
    }

  handleDay(action: string, event: any): void {
    this.selectedSubject = {};
      this.selectedExamType = {};
      this.selectedClassroom = null;
      this.selectedTime = null;
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  onChangeBuild($event, index, event) {
    if(index != "") {
      this.classroomService.getClassroomsByBuilding(this.buildings[index].id).subscribe(classes => {
        this.classes = classes;
        this.refresh.next();
      });
    } else {
      this.selectedClassroom = null
      this.classes = null
    }
  }

  onChangeSubject($event, index, event) {
    if(index != "") {
      this.selectedSubject = this.mySubjects[index];
    } else {
      this.selectedSubject = null
    }
  }

  onChangeTime($event, time) {
    if(time != "") {
      this.selectedTime = time
    } else {
      this.selectedTime = null
    }
  }

  onChangeExamType($event, index, event) {
    if(index != "") {
      this.selectedExamType = this.examTypes[index];
    } else {
      this.selectedExamType = null
    }
  }
  

  save(event: any) {
    if(this.selectedSubject != undefined && this.selectedExamType != undefined && this.selectedClassroom != undefined && this.selectedTime != undefined) {
      let item = this.mySubjects.find(i => i.id == this.selectedSubject.id);
      if(this.events.length > 0) {
        if (event.id != undefined) {
          const index: number = this.events.indexOf(event);
          if (index !== -1) {
              this.events[index] = {
                start: new Date(this.datePipe.transform(event.start, 'yyyy-MM-dd') + 'T' + this.selectedTime),
                end: new Date(this.datePipe.transform(event.start, 'yyyy-MM-dd') + 'T' + this.selectedTime),
                title: this.selectedExamType.description + " di " + this.selectedSubject.name + " in " + this.selectedClassroom.building.name + " - " + this.selectedClassroom.name + " ore: " + this.selectedTime,
                id: event.id,
                color: item.color,
                actions: this.actions,
                resizable: {
                  beforeStart: true,
                  afterEnd: true
                },
                draggable: true,
                room: this.selectedClassroom,
                subject: this.selectedSubject,
                examType: this.selectedExamType,
                present: event.present
              }
              this.refresh.next()
            } else {
              let id: number = (Number)(this.events[this.events.length]);
              while(true) {
                if(!this.events.find(i => i.id == id)) {
                  break;
                } else {
                  id++;
                }
              }
              this.events.push(
                {
                  start: new Date(this.datePipe.transform(event.date, 'yyyy-MM-dd') + 'T' + this.selectedTime),
                  end: new Date(this.datePipe.transform(event.date, 'yyyy-MM-dd') + 'T' + this.selectedTime),
                  title: this.selectedExamType.description + " di " + this.selectedSubject.name + " in " + this.selectedClassroom.building.name + " - " + this.selectedClassroom.name + " ore: " + this.selectedTime,
                  id: id,
                  color: item.color,
                  actions: this.actions,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: true,
                  room: this.selectedClassroom,
                  subject: this.selectedSubject,
                  examType: this.selectedExamType,
                  present: event.present
                }
              );
            }
        } else {
          let id: number = (Number)(this.events[this.events.length]);
          while(true) {
            if(!this.events.find(i => i.id == id)) {
              break;
            } else {
              id++;
            }
          }
          this.events.push(
            {
              start: new Date(this.datePipe.transform(event.date, 'yyyy-MM-dd') + 'T' + this.selectedTime),
              end: new Date(this.datePipe.transform(event.date, 'yyyy-MM-dd') + 'T' + this.selectedTime),
              title: this.selectedExamType.description + " di " + this.selectedSubject.name + " in " + this.selectedClassroom.building.name + " - " + this.selectedClassroom.name + " ore: " + this.selectedTime,
              id: (Number)(this.events[this.events.length]),
              color: item.color,
              actions: this.actions,
              resizable: {
                beforeStart: true,
                afterEnd: true
              },
              draggable: true,
              room: this.selectedClassroom,
              subject: this.selectedSubject,
              examType: this.selectedExamType,
              present: event.present
            }
          );
        }
      } else {
        this.events.push(
          {
            start: new Date(this.datePipe.transform(event.date, 'yyyy-MM-dd') + 'T' + this.selectedTime),
            end: new Date(this.datePipe.transform(event.date, 'yyyy-MM-dd') + 'T' + this.selectedTime),
            title: this.selectedExamType.description + " di " + this.selectedSubject.name + " in " + this.selectedClassroom.building.name + " - " + this.selectedClassroom.name + " ore: " + this.selectedTime,
            id: 0,
            color: item.color,
            actions: this.actions,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true,
            room: this.selectedClassroom,
            subject: this.selectedSubject,
            examType: this.selectedExamType,
            present: event.present
          }
        );
      }
        this.selectedClassroom = null
        this.selectedSubject = {}
        this.selectedExamType = {}
        this.selectedTime = null
        this.modal.dismissAll('success')
        this.valid = true;
        this.refresh.next();
    } else {
      this.valid = false;
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
    
    this.degreeCourseTypes = null
    this.courses = null
    this.aa = null
    this.terms = null
    this.selectedCourseType = undefined
    this.selectedTypeDegreeCourse = undefined
    this.selectedCourse = undefined;
    this.selectedYear = undefined;
    this.selectedTerm = undefined;
  }

  saveScheduler() {
    if (this.events.length ==  0) {
      this.error=true;
    } else {
      if(this.error == false) {
        for(let e of this.events) {
          if(e.present) {
            this.selectedExams.push({
              idexam: e.id,
              classroom: e.room,
              subject: e.subject,
              examtype: e.examType,
              date: e.start
            } as Exam);
          } else {
            this.selectedExams.push({
              idexam: null,
              classroom: e.room,
              subject: e.subject,
              examtype: e.examType,
              date: e.start
            } as Exam);
          }
          
      }

        this.examService.saveAll(this.selectedExams).subscribe(result => {
          this.schedule = false;
          this.mySubjects = [];
          this.events = [];
          
          this.degreeCourseTypes = null
          this.courses = null
          this.aa = null
          this.terms = null
          this.selectedCourseType = undefined
          this.selectedTypeDegreeCourse = undefined
          this.selectedCourse = undefined;
          this.selectedYear = undefined;
          this.selectedTerm = undefined;
          this.selectedTypeLessons = [];
        });
      }
      }

  }
}

