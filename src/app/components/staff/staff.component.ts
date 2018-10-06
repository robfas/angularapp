import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../models/Ticket';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  tickets: Ticket[];
  

  constructor(public nav: NavbarService, public ticketService: TicketService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
      console.log(this.tickets);
    });
    

  }

}
