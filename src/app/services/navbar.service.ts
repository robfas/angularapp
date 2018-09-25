import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  homeVisible: boolean;
  staffVisible: boolean;
  teacherVisible: boolean;

  constructor() { this.homeVisible = true; this.staffVisible = false; this.teacherVisible = false;}

  showNavStaff() { this.homeVisible = false; this.staffVisible = true;}
}
