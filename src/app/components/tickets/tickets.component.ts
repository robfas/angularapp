import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/Ticket';
import { NavbarService } from '../../services/navbar.service';
import { TicketService } from '../../services/ticket.service';7
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[];
  filteredtickets: Ticket[];

  constructor(public nav: NavbarService, public ticketService: TicketService, private route: ActivatedRoute, public staffService: StaffService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.staffService.showTable();
   
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets.filter(tickets=>tickets.ticketStatus.idstatus < 3);
      console.log(this.tickets);
    });
  }

  showArchived(){
    this.staffService.showArchived();
    this.ticketService.getTickets().subscribe(tickets => {
     this.filteredtickets = tickets.filter(tickets=>tickets.ticketStatus.idstatus > 2);
   });
   }
}
