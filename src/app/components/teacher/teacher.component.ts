import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  
  constructor(public nav: NavbarService, private router: Router) { }
  user: User;
  
  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'teacher') {
        this.user={
          iduser: JSON.parse(localStorage.getItem('currentUser')).iduser,
          name: JSON.parse(localStorage.getItem('currentUser')).name,
          surname: JSON.parse(localStorage.getItem('currentUser')).surname,
          residence: JSON.parse(localStorage.getItem('currentUser')).residence,
          phone: JSON.parse(localStorage.getItem('currentUser')).phone,
          email: JSON.parse(localStorage.getItem('currentUser')).email,
          dateBirth: JSON.parse(localStorage.getItem('currentUser')).dateBirth,
        }
        this.nav.showNavTeacher();
      } else {
        this.router.navigate(['/staff']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }


}
