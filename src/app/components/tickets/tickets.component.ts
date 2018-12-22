import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/Ticket';
import { NavbarService } from '../../services/navbar.service';
import { TicketService } from '../../services/ticket.service';7
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { User } from '../models/User';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[];
  filteredtickets: Ticket[];
  user: User;

  constructor(public nav: NavbarService, public ticketService: TicketService, private route: ActivatedRoute, public staffService: StaffService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      this.user={
        iduser: JSON.parse(localStorage.getItem('currentUser')).iduser,
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname,
    }
  }
  
    this.nav.showNavStaff();
    this.staffService.showTable();
   
    this.ticketService.getTickets().subscribe(tickets => {
      //DA CAMBIAREEE
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
