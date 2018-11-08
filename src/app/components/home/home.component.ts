import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import{User} from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 user: User;
  constructor(public nav: NavbarService, private router: Router) { }
    
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
        if (JSON.parse(localStorage.getItem('currentUser')).type == "teacher") {
          this.router.navigate(['/teacher']);
        } else if (JSON.parse(localStorage.getItem('currentUser')).type == "employee") {
          this.router.navigate(['/staff']);
        }
    } else {
      this.nav.showHome();
    }
    }
  }

  


