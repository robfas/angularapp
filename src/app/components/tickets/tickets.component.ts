import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/Ticket';
import { NavbarService } from '../../services/navbar.service';
import { TicketService } from '../../services/ticket.service';7
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { User } from '../models/User';
import { ClassroomService } from '../../services/classroom.service';
import { Class } from '../models/Class';
import { TicketMessageService } from '../../services/ticketMessage.service';
import { TicketMessage } from '../models/TicketMessage';
import { Teacher } from '../models/Teacher';
import { TicketStatus } from '../models/TicketStatus';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { BuildingService } from '../../services/building.service';
import { Building } from '../models/Building';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[];
  filteredtickets: Ticket[];
  user: User;
  tableVisible: boolean;
  tableArchivedVisible: boolean;
  teacherTable: boolean;
  newTicket: boolean;
  classrooms: Class[];
  filteredclassrooms: Class[];
  buildings: Building[];
  ticket: Ticket = {};
  class: Class[] = [];
  teacher: Teacher;
  ticketStatus: TicketStatus;
  datePipe: DatePipe;
  myDate: any;
  teacherbadge: number = 0;
  staffbadge: number = 0;

  constructor(public nav: NavbarService, private router: Router, public buildingService: BuildingService, public ticketService: TicketService,public ticketMessageService: TicketMessageService, public classroomService: ClassroomService, private route: ActivatedRoute, public staffService: StaffService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      this.user={
        iduser: JSON.parse(localStorage.getItem('currentUser')).iduser,
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname,
        type: JSON.parse(localStorage.getItem('currentUser')).type
    }
    
  
   if(this.user.type==='employee'){
    this.nav.showNavStaff();
    this.showTable();
   
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets.filter(tickets=>(tickets.ticketStatus.idstatus < 3 || tickets.employee.idemployee === this.user.iduser || tickets.employee.idemployee === null));
      console.log(this.tickets);
      for(let i of this.tickets){
        if(i.ticketmessages.length % 2 !== 0){
          this.staffbadge +=1;
          console.log(this.staffbadge);
        }         
      }
    });
  }

  if(this.user.type==='teacher'){
    this.nav.showNavTeacher();
    this.showTableTeacher();
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets.filter(tickets=>tickets.teacher.idteacher === this.user.iduser);
      console.log(this.tickets);
      for(let i of this.tickets){
        if(i.ticketmessages.length % 2 === 0){
          this.teacherbadge+=1;
          console.log(this.teacherbadge);
        }         
      }
    });
    this.buildingService.getBuildings().subscribe(buildings=>{
      this.buildings = buildings;
    })
    this.classroomService.getAllClassrooms().subscribe(classrooms=>{
      this.classrooms = classrooms;
    })
  }
  } else {
    this.router.navigate(['/']);
  }
  }

  onChange(classrooms,building){
    this.filteredclassrooms = this.classrooms.filter(classrooms=>classrooms.building.id === parseInt(building));
    console.log(this.filteredclassrooms)
  }

  showTable(){ this.tableVisible = true; this.tableArchivedVisible = false };

  showArchivedTickets() {this.tableVisible = false; this.tableArchivedVisible = true};

  showArchived(){
    this.showArchivedTickets();
    this.ticketService.getTickets().subscribe(tickets => {
     this.filteredtickets = tickets.filter(tickets=>tickets.ticketStatus.idstatus > 2);
   });
   }

   showTableTeacher(){
    this.tableArchivedVisible = false
    this.tableVisible = false;
    this.teacherTable = true;
   }

   showArchivedTeacher(){
    this.teacherTable = false;
   }

   openNewTicket(){
    this.teacherTable = false;
    this.newTicket = true;
   }

   send(title, classroom, textmessage){
    if(!title || !classroom || !textmessage){
      alert("Inserisci dati richiesti!");
    }
    else{
      
      this.class = this.classrooms.filter(classrooms => classrooms.id === parseInt(classroom))
      this.teacher={
        idteacher : this.user.iduser,
        name: this.user.name,
        surname: this.user.surname
      }
      this.ticketStatus ={
        idstatus: 1,
      }
      this.myDate = formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS", 'en');
      console.log(this.teacher, this.myDate,this.class);
      this.ticketService.saveTicket({title: title, teacher: this.teacher, ticketStatus: this.ticketStatus, date: this.myDate, classroom: this.class[0]}as Ticket).subscribe(ticket=>{
        this.ticket = ticket;
        console.log(ticket);
        this.ticketMessageService.saveMessage({idticket: this.ticket.id, user: this.user, text: textmessage, date: this.ticket.date} as TicketMessage).subscribe(message => {
          console.log(message);
          alert('Segnalazione inviata con successo!');
          this.ticketService.getTickets().subscribe(tickets => {
            this.tickets = tickets.filter(tickets=>tickets.teacher.idteacher === this.user.iduser);
        this.newTicket = false;
        this.teacherTable = true;
      });
        });
      });
    }
   }


   back(){
    this.teacherTable = true;
    this.newTicket = false;
   }
}
