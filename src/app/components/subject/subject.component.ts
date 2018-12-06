import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { TypeSubject } from '../models/TypeSubject';
import { SubjectofstudyService } from '../../services/subjectofstudy.service';
import { Teacher } from '../models/Teacher';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  typeSubjects: TypeSubject[];
  typeSubject: TypeSubject;
  teacher: Teacher;

  constructor(public nav: NavbarService, public subjectofstudyService: SubjectofstudyService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.subjectofstudyService.getAllSubjectTypes().subscribe(typeSubjects =>{
      this.typeSubjects = typeSubjects;
    });
  }

  saveSubject(idtypeSubject, subjdescr, subjcfu, teachname, teachsurname){
    this.typeSubjects = this.typeSubjects.filter(typeSubjects=>typeSubjects.idtypeSubject === parseInt(idtypeSubject));
    this.teacher.surname = teachsurname;
    this.teacher.name = teachname;
    this.subjectofstudyService.saveSubject({name: this.typeSubjects[0].name, description: subjdescr, teacherDTO: this.teacher, cfu: subjcfu, typeSubjectDTO: this.typeSubject} as Subject).subscribe(subject => {
      console.log(subject);
    });
  }
}
