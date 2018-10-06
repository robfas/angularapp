import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/Ticket';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { TicketService } from '../../services/ticket.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticket: Ticket;

  constructor(public nav: NavbarService, public ticketService: TicketService, private route: ActivatedRoute,  private location: Location) { }

  ngOnInit() {
    this.nav.showNavStaff();
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
      this.ticketService.getTicketById(id).subscribe(ticket => {
        this.ticket = ticket;
        console.log(ticket);
      });
    }
  }

