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
import { Router } from '@angular/router';
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

  constructor(private modal: NgbModal, private router: Router, public aaService: AcademicYearService, public subjectService: SubjectService, private route: ActivatedRoute, public buildingService: BuildingService, public classroomService: ClassroomService, public calendarService: CalendarService, public nav: NavbarService, public courseService: CourseService, public termService: TermService) { }

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
            primary: '#' + ('000000').slice(-6),
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
        this.calendarService.getScheduler(this.selectedCourse, this.selectedTerm.idterm).subscribe(typeLessons =>{

          for (let l of typeLessons) {
            let item = this.mySubjects.find(i => i.id == l.subject.id);
                this.events.push({
                  start: new Date('2017-05-0' + l.day.idDay + 'T' + l.start),
                  end: new Date('2017-05-0' + l.day.idDay + 'T' + l.end),
                  title: l.subject.name + " " + l.classroom.building.name + ", " + l.classroom.name,
                  id: l.idtypeLesson,
                  color: item.color,
                  actions: this.actions,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: true,
                  room: l.classroom,
                  subject: l.subject
                })
                
            
            
        }
          this.refresh.next();
        })
        
      this.calendarService.schedulerExists(this.selectedTerm.idterm, this.selectedCourse.idcourse).subscribe(idscheduler=> {
        this.scheduler = {
          idScheduler: idscheduler,
          degreeCourse: this.selectedCourse,
          term: this.selectedTerm
        }
      })

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
    if(action != 'Deleted') {
      this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    if(event.room != undefined) {
      this.classroomService.getClassroomsByBuilding(event.room.building.id).subscribe(classes => {
        this.classes = classes;
        this.refresh.next();
      });
    }
    }
  }

  addEvent2(s): void {
    const datePipe = new DatePipe('en-US');
    this.events.push({
      title: s.name,
      id: s.id,
      start: new Date(2017, 4, 1, 8, 0),
      end: new Date(2017, 4, 1, 9, 0),
      color: s.color,
      draggable: true,
      actions: this.actions,
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
     const d: Day = {idDay: Number(this.datePipe.transform(event.start, 'd'))};

      this.classroomService.getAvailableClassrooms(this.buildings[index].id, {idtypeLesson: event.id, start: event.start, end: event.end, day: d, scheduler: this.scheduler} as TypeLesson).subscribe(classes => {
        this.classes = classes;
        this.refresh.next();
      });
      
    } else {
      this.selectedClassroom = null
      this.classes = null
    }
  }
  save(event: MyEvent) {
    if(this.selectedClassroom != null) {
        event.room = this.selectedClassroom;
        event.title = event.subject.name + " " + this.selectedClassroom.building.name + ", " + this.selectedClassroom.name,
        this.selectedClassroom = null

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
      for(let e in this.events) {
        if (this.events[e].room == undefined) {
          this.error = true;
          break;
        } else if(Number(e) == this.events.length-1) {
          this.error = false;
        }
      }
      if(this.error == false) {
        for(let e of this.events) {
          this.selectedTypeLessons.push({
              idtypeLesson: e.id,
              start: new Date(e.start),
              end: new Date(e.end),
              day: {idDay: Number(this.datePipe.transform(e.start, 'd'))} as Day,
              subject: e.subject,
              classroom: e.room
            } as TypeLesson);
        
      }
        this.scheduler.typeLessons = this.selectedTypeLessons;
        this.calendarService.save(this.scheduler).subscribe(scheduler => {
          this.schedule = false;
          this.mySubjects = [];
          this.events = [];
          this.activeDayIsOpen = false;
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
