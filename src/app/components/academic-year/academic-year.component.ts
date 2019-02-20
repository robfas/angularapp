import { Component, OnInit } from '@angular/core';
import { AcademicYearService } from '../../services/academic-year.service';
import { AcademicYear } from '../models/AcademicYear';
import { NavbarService } from '../../services/navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TermComponent } from '../term/term.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.css']
})
export class AcademicYearComponent implements OnInit {
  academicyears: AcademicYear[];
  year: number;
  years: number;
  tableVisible: boolean;

  constructor(public nav: NavbarService,private router: Router,public academicYearService: AcademicYearService, private modalService: NgbModal) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'employee') {
        this.nav.showNavStaff();
        this.academicYearService.getAllYears().subscribe(academicyears =>{
        this.academicyears = academicyears;
        if(this.academicyears.length === 0){
          this.tableVisible = false;
        }
        else this.tableVisible = true;
      });
    } else {
      this.router.navigate(['/teacher']);
    }
  } else {
    this.router.navigate(['/']);
  }
}

onchange(year){
  this.years = parseInt(year)+1;
}

saveYear(year){
  this.academicYearService.saveAcademicYear({year: parseInt(year)} as AcademicYear).subscribe(academicYear => {
    this.academicyears.push(academicYear);
    this.tableVisible = true;
  });
}

dettagli(academicYear: AcademicYear){
  this.router.navigate(['/staff/terms/' + academicYear.idacademicYear]);
}
}