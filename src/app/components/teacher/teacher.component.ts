import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { User } from '../models/User';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  
  constructor(public nav: NavbarService) { }
  user: User;
  
  ngOnInit() {
    this.nav.showNavTeacher();

    if(localStorage.getItem('currentUser')) {
      this.user={
        iduser: JSON.parse(localStorage.getItem('currentUser')).iduser,
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname,
        residence: JSON.parse(localStorage.getItem('currentUser')).residence,
        phone: JSON.parse(localStorage.getItem('currentUser')).phone,
        email: JSON.parse(localStorage.getItem('currentUser')).email,
        dateBirth: JSON.parse(localStorage.getItem('currentUser')).dateBirth,
      }};
  }


}
