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
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../models/Lesson';

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
  typeLesson: TypeLesson;
}

interface MySubject extends SubjectStudy {
  color?: any;
}

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class EditCalendarComponent implements OnInit {
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
  timeErr: Boolean = true;
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
  selectedTimeEnd: String;
  examTypes: ExamType[] = [];
  selectedExams: Exam[] = [];
  editedLessons: Lesson[] = [];

  constructor(private modal: NgbModal, public lessonService: LessonService, public aaService: AcademicYearService, public examService: ExamService, public subjectService: SubjectService, private route: ActivatedRoute, public buildingService: BuildingService, public classroomService: ClassroomService, public calendarService: CalendarService, public nav: NavbarService, public courseService: CourseService, public termService: TermService) { }

  ngOnInit() {
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
        this.lessonService.getAllLessonsByCourseAndTerm(this.selectedCourse.idcourse, this.selectedTerm.idterm).subscribe(lessons =>{
          if(lessons.length > 0) {
            this.viewDate = lessons[0].start
            for (let l of lessons) {
              let item = this.mySubjects.find(i => i.id == l.typeLesson.subject.id);
                this.events.push({
                  start: l.start,
                  end: l.end,
                  title: l.typeLesson.subject.name + " in " + l.classroom.building.name + " - " + l.classroom.name + " ore: " + this.datePipe.transform(l.start, 'HH:mm') + "-" + this.datePipe.transform(l.end, 'HH:mm'),
                  id: l.idlesson,
                  color: item.color,
                  actions: this.actionsLimited,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: true,
                  room: l.classroom,
                  subject: l.typeLesson.subject,
                  typeLesson: l.typeLesson
                })
          }
          console.log(this.events)
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

  handleEvent(action: string, event: any): void {
    this.timeErr = true;
    if (action == 'Clicked') {
      this.selectedSubject = {};
      this.selectedClassroom = null;
      this.selectedTime = null;
      this.selectedTimeEnd = null;
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
      this.selectedTimeEnd = this.datePipe.transform(event.end, 'HH:mm');
      this.classroomService.getClassroomsByBuilding(event.room.building.id).subscribe(classes => {
        this.classes = classes;
        this.refresh.next();
      });
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
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

  onChangeTimeEnd($event, time) {
    if(time != "") {
      this.selectedTimeEnd = time
    } else {
      this.selectedTimeEnd = null
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
    if(this.selectedClassroom != undefined && this.selectedTime != undefined && this.selectedTimeEnd != undefined) {
      if(new Date(this.datePipe.transform(event.start, 'yyyy/MM/dd') + ' ' + this.selectedTime) >= new Date(this.datePipe.transform(event.end, 'yyyy/MM/dd') + ' ' + this.selectedTimeEnd)) {
        this.timeErr=false;
        console.log("errtime")
      } else {
        this.timeErr=true;
        let item = this.mySubjects.find(i => i.id == this.selectedSubject.id);
          const index: number = this.events.indexOf(event);
          if (index !== -1) {
              this.events[index] = {
                start: new Date(this.datePipe.transform(event.start, 'yyyy-MM-dd') + 'T' + this.selectedTime),
                end: new Date(this.datePipe.transform(event.end, 'yyyy-MM-dd') + 'T' + this.selectedTimeEnd),
                title: event.subject.name + " in " + this.selectedClassroom.building.name + " - " + this.selectedClassroom.name + " ore: " + this.selectedTime + "-" + this.selectedTimeEnd,
                id: event.id,
                color: item.color,
                actions: this.actionsLimited,
                resizable: {
                  beforeStart: true,
                  afterEnd: true
                },
                draggable: true,
                room: this.selectedClassroom,
                subject: event.subject,
                typeLesson: event.typeLesson
              }
              this.refresh.next()
            }
            const indexLes: number = this.editedLessons.findIndex(x => x.idlesson==event.id);
          if (indexLes !== -1) {
            this.editedLessons[indexLes].start = new Date(this.datePipe.transform(event.start, 'yyyy-MM-dd') + 'T' + this.selectedTime),
            this.editedLessons[indexLes].end = new Date(this.datePipe.transform(event.end, 'yyyy-MM-dd') + 'T' + this.selectedTimeEnd),
            this.editedLessons[indexLes].classroom = this.selectedClassroom
            this.editedLessons[indexLes].typeLesson = event.typeLesson
          } else {
            this.editedLessons.push({
              idlesson: event.id,
              start: new Date(this.datePipe.transform(event.start, 'yyyy-MM-dd') + 'T' + this.selectedTime),
              end: new Date(this.datePipe.transform(event.end, 'yyyy-MM-dd') + 'T' + this.selectedTimeEnd),
              classroom: this.selectedClassroom,
              typeLesson: event.typeLesson
            } as Lesson);
          }
            
        
      
        this.selectedClassroom = null
        this.selectedSubject = {}
        this.selectedTime = null
        this.selectedTimeEnd = null
        this.modal.dismissAll('success')
        this.valid = true;
        this.refresh.next();
        console.log(this.events)
        }
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

        console.log(this.editedLessons)
      this.lessonService.editLessons(this.editedLessons).subscribe(result => {
        console.log(result)
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
          this.activeDayIsOpen = false;
      });
      
    

      
       /* this.examService.saveAll(this.selectedExams).subscribe(result => {
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
        });*/
      }
      }

  }
}

