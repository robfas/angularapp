import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { SubjectService } from '../../services/subject.service';
import { TypeSubject } from '../models/TypeSubject';

@Component({
  selector: 'app-subject-type',
  templateUrl: './subject-type.component.html',
  styleUrls: ['./subject-type.component.css']
})
export class SubjectTypeComponent implements OnInit {

  constructor(public nav: NavbarService, public subjectofstudyService: SubjectService) { }

  ngOnInit() {
    this.nav.showNavStaff();
  }

  save(name, description){
    if(!name || !description){
      alert("Inserisci i dati richiesti!");
    }
    else{
    this.subjectofstudyService.saveTypeSubject({name: name, description: description} as TypeSubject).subscribe(typesubject => {
      console.log(typesubject);
      alert("Tipo di insegnamento inserito con successo!");
    })
  }
  }

}
