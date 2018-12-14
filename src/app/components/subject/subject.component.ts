import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { TypeSubject } from '../models/TypeSubject';
import { SubjectService } from '../../services/subject.service';
import { UserService } from '../../services/user.service';
import { Teacher } from '../models/Teacher';
import { SubjectStudy } from '../models/SubjectStudy';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  typeSubjects: TypeSubject[];
  typeSubject: TypeSubject;
  teachers: Teacher[];
  teacher: Teacher;

  constructor(public nav: NavbarService, public subjectofstudyService: SubjectService, public userService: UserService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.subjectofstudyService.getAllSubjectTypes().subscribe(typeSubjects =>{
      this.typeSubjects = typeSubjects;
    });
    this.userService.getAllTeachers().subscribe(teachers =>{
      this.teachers = teachers;
    }) 
  }

  saveSubject(idtypeSubject, subjdescr, subjcfu, idteacher){
    console.log(idteacher, idtypeSubject);
    this.typeSubjects = this.typeSubjects.filter(typeSubjects=>typeSubjects.idtypeSubject === parseInt(idtypeSubject));
    console.log(this.typeSubjects);
    this.teachers = this.teachers.filter(teachers=>teachers.idteacher === parseInt(idteacher));
    this.subjectofstudyService.saveSubject({name: this.typeSubjects[0].name, description: subjdescr, teacherDTO: this.teachers[0], cfu: subjcfu, typeSubjectDTO: this.typeSubjects[0]} as SubjectStudy).subscribe(subject => {
      console.log(subject);
    });
  }
}
