import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import {Appointment, Room, Owner, Priority, SchoolcalendarService} from '../../services/schoolcalendar.service';
import { ClassroomService } from '../../services/classroom.service';
import { DxSchedulerModule, DxCheckBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-school-calendar',
  templateUrl: './school-calendar.component.html',
  styleUrls: ['./school-calendar.component.css']
})
export class SchoolCalendarComponent implements OnInit {
  appointmentsData: Appointment[];
    owners: Owner[];
    rooms: Room[];
    priorities: Priority[];
    resourcesList: string[] = ["Owner", "Room", "Priority"];
    currentDate: Date = new Date(2018, 9, 1);
    selectedResource: string = this.resourcesList[0];

    constructor(service: SchoolcalendarService, public nav: NavbarService) {
      this.appointmentsData = service.getAppointments();
      this.owners = service.getOwners();
      this.rooms = service.getRooms();
      this.priorities = service.getPriorities();
    }

    showToast(event, value, type) {
        notify(event + " \"" + value + "\"" + " task", type, 800);
    }

    onAppointmentAdded(e) {
        this.showToast("Added", e.appointmentData.text, "success");
    }

    onCellClick(e) {
      this.showToast("Adding", e, "success");
      
  }

    onAppointmentUpdated(e) {
        this.showToast("Updated ", e.appointmentData.startDate, "info");
    }

    onAppointmentDeleted(e) {
        this.showToast("Deleted", e.appointmentData.text, "warning");
    }


  ngOnInit() {
    this.nav.showNavStaff();
  }
  

}
