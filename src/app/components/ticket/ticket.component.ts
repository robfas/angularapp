import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/Ticket';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { TicketService } from '../../services/ticket.service';
import { StatusService } from '../../services/status.service';
import { Location } from '@angular/common';
import { Status } from '../models/Status';
import { Teacher } from '../models/Teacher';
import { Class } from '../models/Class';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticket: Ticket;
  stati: Status[];
  teacher: Teacher;
  classroom: Class;
  state: Status = <Status>{};

  constructor(public nav: NavbarService, public ticketService: TicketService, public statusService: StatusService, private route: ActivatedRoute,  private location: Location) { }

  ngOnInit() {
    this.nav.showNavStaff();
    const id = +this.route.snapshot.paramMap.get('id');
      this.ticketService.getTicketById(id).subscribe(ticket => {
        this.ticket = ticket;
        console.log(ticket);
      });
      this.statusService.getStatus().subscribe(stati => {
        this.stati = stati;
        console.log(stati);
      });
      
    }

    updateTicket(id, title, teacher, classroom, building, text, idstatus, date){
      if (!text || !idstatus || (idstatus==undefined) ){
        alert('Insert post!');
      }else{
        this.state.idstatus = parseInt(idstatus);

        console.log(id, title, teacher, classroom, building, text, this.state, date);

      this.ticketService.saveTicket({id, title, teacher, classroom, building, text, status:this.state, date} as Ticket).subscribe(ticket => {
        console.log(ticket);
      });

    }


  }
}
