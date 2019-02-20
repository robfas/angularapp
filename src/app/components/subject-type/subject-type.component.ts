import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { SubjectService } from '../../services/subject.service';
import { TypeSubject } from '../models/TypeSubject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-type',
  templateUrl: './subject-type.component.html',
  styleUrls: ['./subject-type.component.css']
})
export class SubjectTypeComponent implements OnInit {

  constructor(public nav: NavbarService, private router: Router, public subjectofstudyService: SubjectService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'employee') {
        this.nav.showNavStaff();
      } else {
        this.router.navigate(['/teacher']);
      }
    } else {
      this.router.navigate(['/']);
    }
    
  }

  save(name, description){
    if(!name || !description){
      alert("Inserisci i dati richiesti!");
    }
    else{
    this.subjectofstudyService.saveTypeSubject({name: name, description: description} as TypeSubject).subscribe(typesubject => {
      alert("Tipo di insegnamento inserito con successo!");
      this.router.navigate(['/staff']);
    })
  }
  }

}
