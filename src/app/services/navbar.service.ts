import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  homeVisible: boolean;
  staffVisible: boolean;
  teacherVisible: boolean;
  name: String;

  constructor() { this.homeVisible; this.staffVisible; this.teacherVisible;}

  showNavStaff() { this.homeVisible = false; this.staffVisible = true; this.teacherVisible = false;}

  showNavTeacher() { this.homeVisible = false; this.staffVisible = false; this.teacherVisible = true;}

  showHome() { this.homeVisible = true; this.staffVisible = false; this.teacherVisible = false;}

  //setName(name: String) {this.name=name;}
}
