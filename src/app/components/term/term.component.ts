import { Component, OnInit } from '@angular/core';
import { Term } from '../models/Term';
import { AcademicYearService } from '../../services/academic-year.service';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AcademicYear } from '../models/AcademicYear';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {
  terms: Term[];
  years: AcademicYear[];
  academicyears: AcademicYear[];
  showterms: boolean;
  numbers : number[] = [] ;
  
  constructor(public nav: NavbarService, public academicYearService: AcademicYearService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.academicYearService.getAllYears().subscribe(years=>{
      this.academicyears = years.filter(years=> years.idacademicYear===id);
      console.log(this.academicyears)
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.academicYearService.getTermsByAA(id).subscribe(terms=>{
      this.terms = terms;
      if(this.terms == undefined || this.terms.length == 0){
        this.showterms = false;
      }
      else{
        this.showterms = true;
      }
    });
    
  }

  add(number){
    this.numbers = [];
    console.log(number)
    for(let i = 0; i<number; i++){
    this.numbers[i]= i;
    }
    console.log(this.numbers);
  }

  remove(){
    this.numbers = [];
  }

  saveterms(startdate, enddate, academicyears){
    console.log(startdate, enddate);
    console.log(this.academicyears[0]);
   
    this.academicYearService.saveTerm({start: startdate, end: enddate, academicYear: this.academicyears[0]} as Term).subscribe(term => {
      console.log(term)
    });
    
  }

  update(){
    window.location.reload();
  }
  
}
