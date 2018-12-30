import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../models/Ticket';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { User } from '../models/User';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  tickets: Ticket[];
  filteredtickets: Ticket[];
  user: User;

  constructor(public nav: NavbarService, public ticketService: TicketService, private route: ActivatedRoute, public staffService: StaffService) { }

  ngOnInit() {
    console.log(localStorage.getItem('currentUser'))
    if(localStorage.getItem('currentUser')) {
      this.user={
        iduser: JSON.parse(localStorage.getItem('currentUser')).iduser,
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname,
        residence: JSON.parse(localStorage.getItem('currentUser')).residence,
        phone: JSON.parse(localStorage.getItem('currentUser')).phone,
        email: JSON.parse(localStorage.getItem('currentUser')).email,
        dateBirth: JSON.parse(localStorage.getItem('currentUser')).dateBirth,
      }};

    this.nav.showNavStaff();

  }

}
