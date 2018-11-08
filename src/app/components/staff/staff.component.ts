import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../models/Ticket';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  tickets: Ticket[];
  filteredtickets: Ticket[];
  

  constructor(public nav: NavbarService, public ticketService: TicketService, private route: ActivatedRoute, public staffService: StaffService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.staffService.showTable();
   
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets.filter(tickets=>tickets.ticketStatus.idticketStatus !== 4);
      console.log(this.tickets);
    });
  }

  showArchived(){
   this.staffService.showArchived();
   this.ticketService.getTickets().subscribe(tickets => {
    this.filteredtickets = tickets.filter(tickets=>tickets.ticketStatus.idticketStatus === 4);
  });
  }

}
