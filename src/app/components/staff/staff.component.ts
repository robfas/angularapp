import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../models/Ticket';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  tickets: Ticket[];
  filteredtickets: Ticket[];
  user: User;
  toDo: boolean;

  constructor(public nav: NavbarService, public _DomSanitizer: DomSanitizer, private router: Router, public ticketService: TicketService, private route: ActivatedRoute, public staffService: StaffService, public userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'employee') {
        this.user=JSON.parse(localStorage.getItem('currentUser'))
        console.log(this.user)
        this.nav.showNavStaff();
        this.ticketService.getTickets().subscribe(tickets => {
          this.tickets = tickets.filter(tickets=>(tickets.ticketStatus.idstatus < 3 && ( tickets.employee.idemployee === null ||  tickets.employee.idemployee === this.user.iduser) && (tickets.ticketmessages.length)%2 !== 0));
          if(this.tickets.length===0){
            this.toDo = false;
          }
          else{
            this.toDo = true;
          }
        })
      } else {
        this.router.navigate(['/teacher']);
      }
    } else {
      this.router.navigate(['/']);
    }

  }

  save(residence,domicile,phone){
    console.log(residence,domicile,phone)
    this.userService.saveUser({iduser: this.user.iduser, name: this.user.name, surname: this.user.surname, email: this.user.email, phone: phone, residence: residence, domicile: domicile, citizenship: this.user.citizenship, placeBirth: this.user.placeBirth, sex: this.user.sex, ssn: this.user.ssn, dateBirth: this.user.dateBirth, type: this.user.type} as User).subscribe(user => {
      console.log(user);
    });
  }
}
