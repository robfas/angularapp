import { Component, OnInit } from '@angular/core';
import { AcademicYearService } from '../../services/academic-year.service';
import { AcademicYear } from '../models/AcademicYear';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.css']
})
export class AcademicYearComponent implements OnInit {
  academicyears: AcademicYear[];
  year: number;
  years: number;

  constructor(public nav: NavbarService,public academicYearService: AcademicYearService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.academicYearService.getAllYears().subscribe(academicyears =>{
      this.academicyears = academicyears;
      console.log(this.academicyears);
  });

}
onchange(year){
  this.years = parseInt(year)+1;
}

saveYear(year){
  this.academicYearService.saveAcademicYear({year: parseInt(year)} as AcademicYear).subscribe(academicYear => {
    console.log(academicYear);
  });
   window.location.reload();
}

}