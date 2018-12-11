import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
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
import { NavbarService } from '../../services/navbar.service';
import { SubjectService } from '../../services/subject.service';
import { ActivatedRoute } from '@angular/router';
import { SubjectStudy } from '../models/subjectstudy';
import { ClassroomService } from '../../services/classroom.service';
import { Class } from '../models/Class';

/*const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};*/
import { CalendarDateFormatter, DateFormatterParams,  DAYS_OF_WEEK } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { BuildingService } from '../../services/building.service';
import { Building } from '../models/Building';

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
  selector: 'app-school-calendar2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './school-calendar2.component.html',
  styleUrls: ['./school-calendar2.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class SchoolCalendar2Component implements OnInit {

  subjects: SubjectStudy[];
  mySubjects: MySubject[] = [];
  sub: MySubject;
  buildings: Building[];
  classes: Class[] = [];
  classroom: Class;
  selectedClassroom: Class;
  valid: Boolean = true;

  constructor(private modal: NgbModal, public nav: NavbarService, public subjectService: SubjectService, private route: ActivatedRoute, public buildingService: BuildingService, public classroomService: ClassroomService) {}


  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.nav.showNavStaff();
    this.subjectService.getByIdCourse(id).subscribe(subjects =>{
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
      console.log(this.mySubjects)
    });
    this.buildingService.getBuildings().subscribe(buildings => {
      this.buildings = buildings;
      this.refresh.next();
    });
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

  onChangeBuild($event, index) {
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
}


