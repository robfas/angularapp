import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/Ticket';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { TicketService } from '../../services/ticket.service';
import { TicketStatusService } from '../../services/ticketStatus.service';
import { Location } from '@angular/common';
import { TicketStatus } from '../models/TicketStatus';
import { Teacher } from '../models/Teacher';
import { Class } from '../models/Class';
import { TicketMessageService } from '../../services/ticketMessage.service';
import { TicketMessage } from '../models/TicketMessage';
import { User } from '../models/User';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticket: Ticket;
  stati: TicketStatus[];
  teacher: Teacher;
  classroom: Class;
  state: TicketStatus = <TicketStatus>{};
  messages: TicketMessage[]; 
  user: User;

  constructor(public nav: NavbarService, public ticketService: TicketService, public ticketStatusService: TicketStatusService, private route: ActivatedRoute,  private location: Location) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.user={
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname
      }};
    this.nav.showNavStaff();
    const id = +this.route.snapshot.paramMap.get('id');
      this.ticketService.getTicketById(id).subscribe(ticket => {
        this.ticket = ticket;
        console.log(ticket);
      });
      this.ticketStatusService.getTicketStatus().subscribe(stati => {
        this.stati = stati;
        console.log(stati);
      });
      
    }

    updateTicket(id, title, teacher, user, classroom, building, idstatus, date){
      if (!idstatus || (idstatus==undefined) ){
        alert('Insert post!');
      }else{
        this.state.idticketStatus = parseInt(idstatus);

        console.log(id, title, teacher, user, classroom, building, this.state, date);

      this.ticketService.saveTicket({id, title, teacher, user, classroom, building, status:this.state, date} as Ticket).subscribe(ticket => {
        console.log(ticket);
      });

    }


  }
}
