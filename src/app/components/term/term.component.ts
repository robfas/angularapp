import { Component, OnInit } from '@angular/core';
import { Term } from '../models/Term';
import { AcademicYearService } from '../../services/academic-year.service';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AcademicYear } from '../models/AcademicYear';
import { CourseService } from '../../services/course.service';
import { DegreeCourse } from '../models/DegreeCourse';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {
  terms: Term[];
  newterm: Term = {};
  newterms: Term[] = [];
  years: AcademicYear[];
  academicyears: AcademicYear[];
  showterms: boolean;
  numbers : number[] = [] ;
  coursesofthisyear: DegreeCourse[];
  
  constructor(public nav: NavbarService, public academicYearService: AcademicYearService, public courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.nav.showNavStaff();
    const id = +this.route.snapshot.paramMap.get('id');
    this.academicYearService.getAllYears().subscribe(years=>{
      this.academicyears = years.filter(years=> years.idacademicYear===id);
    });
  
    this.academicYearService.getTermsByAA(id).subscribe(terms=>{
      this.terms = terms;
      if(this.terms == undefined || this.terms.length == 0){
        this.showterms = false;
      }
      else{
        this.showterms = true;
        this.courseService.getAll().subscribe(courses =>{
          this.coursesofthisyear = courses.filter(courses=>courses.academicYear.idacademicYear === id)
          console.log(this.coursesofthisyear)
        });
      }
    });
    this.numbers = [1];
    
   

  }

  addrow(){
    this.numbers.push(this.numbers.length+1);
  }

  removerow(startdate,endddate){
    if(this.numbers.length === 1){
      alert('Devi inserire almeno un periodo!');
    }
    else this.numbers.splice(this.numbers.length-1);
    }
  
  updatestart(startdate, enddate, academicyears){
    let item = this.newterms.find(i => i.end === enddate);
    console.log(item)
    if(item){
      item.start = startdate
      console.log(item);
    }
    else{
    this.newterm = {
      academicYear: this.academicyears[0],
      start: startdate,
 
    }
    this.newterms.push(this.newterm);
   }
    console.log(this.newterms);
  }

  updateend(startdate, enddate){
    let item = this.newterms.find(i => i.start === startdate);
    console.log(item)
    const index: number = this.newterms.indexOf(item)
    item.end = enddate
  
    console.log(item, this.newterms);

  }

  save(){
    this.academicYearService.saveAllTerm(this.newterms).subscribe(terms => {
      this.terms = terms;
      console.log(terms)
      this.showterms = true;
    })
  }

  /*add(number){
    this.numbers = [];
    console.log(number)
    for(let i = 0; i<number; i++){
    this.numbers[i]= i;
    }
    console.log(this.numbers);
  }

  remove(number){
  //  this.numbers = [];
  }

  addterm(startdate, enddate, academicyears){
  
    this.newterm = {
      academicYear: this.academicyears[0],
      start: startdate,
      end: enddate
    }

    this.newterms.push(this.newterm);

    /*this.academicYearService.saveTerm(this.newterm).subscribe(term => {
      console.log(term)
    });
    console.log(this.newterms);
  }

  removeterm(startdate, enddate){
    let item = this.newterms.find(i => i.start === startdate && i.end === enddate);
    const index: number = this.newterms.indexOf(item);
    if(index !== -1){
    this.newterms.splice(index, 1);
    console.log(this.newterms);
    }
    else alert('Periodo già rimosso');
  }


  update(){
    window.location.reload();
  }
  */
  
}