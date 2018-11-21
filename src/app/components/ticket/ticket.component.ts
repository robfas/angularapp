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
import { isEmpty } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

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
  text: string;
  state: TicketStatus = <TicketStatus>{};
  messages: TicketMessage[]; 
  user: User;
  textareaVisible: boolean;
  buttonVisible: boolean;

  constructor(public nav: NavbarService, public ticketMessageService: TicketMessageService, public ticketService: TicketService, public ticketStatusService: TicketStatusService, private route: ActivatedRoute,  private location: Location) {this.buttonVisible, this.textareaVisible}

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.user={
        iduser: JSON.parse(localStorage.getItem('currentUser')).iduser,
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname
      }};
    this.nav.showNavStaff();
    const id = +this.route.snapshot.paramMap.get('id');
      this.ticketService.getTicketById(id).subscribe(ticket => {
        this.ticket = ticket;
        if(this.ticket.employee.idemployee === null || this.ticket.employee.idemployee === undefined ){
          console.log(ticket.employee);
          this.showButton();
          console.log(this.buttonVisible);
      }
        else this.showTextArea();
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
  showButton(){
    this.textareaVisible = false; this.buttonVisible = true;
  }

  showTextArea(){
    this.buttonVisible = false; this.textareaVisible = true;
    console.log(this.user.iduser);
    this.ticket.employee.idemployee = this.user.iduser;
    this.ticket.employee.name = this.user.name;
    this.ticket.employee.surname = this.user.surname;         
    console.log(this.ticket);
    console.log(this.ticket.ticketmessages);

    if(this.ticket.employee.idemployee===null || this.ticket.employee.idemployee === undefined){
    this.ticketService.saveTicket({id: this.ticket.id , title: this.ticket.title, teacher: this.ticket.teacher, employee: this.ticket.employee, classroom: this.ticket.classroom, ticketStatus:this.ticket.ticketStatus, ticketmessages: this.ticket.ticketmessages, date: this.ticket.date} as Ticket).subscribe(ticket => {
      console.log(ticket);
      console.log(this.ticket.ticketmessages);
    });
    }
  }

  saveMessage(textmessage){
    if(textmessage === undefined || !textmessage){
      alert('Inserisci messaggio!');
    }
    else{
      console.log(textmessage);
      console.log(this.ticket.id,this.user,textmessage,this.ticket.date);
      this.ticketMessageService.saveMessage({id: this.ticket.id , title: this.ticket.title, teacher: this.ticket.teacher, employee: this.ticket.employee, classroom: this.ticket.classroom, ticketStatus:this.ticket.ticketStatus, date: this.ticket.date} as Ticket, {idticket: this.ticket.id, user: this.user, text: textmessage, date: this.ticket.date} as TicketMessage).subscribe(ticket => {
        console.log(ticket);
      });
    }
  }

}
