import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { TypeSubject } from '../models/TypeSubject';
import { SubjectofstudyService } from '../../services/subjectofstudy.service';
import { UserService } from '../../services/user.service';
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
  teachers: Teacher[];
  teacher: Teacher;

  constructor(public nav: NavbarService, public subjectofstudyService: SubjectofstudyService, public userService: UserService) { }

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
    console.log(idteacher);
    this.typeSubjects = this.typeSubjects.filter(typeSubjects=>typeSubjects.idtypeSubject === parseInt(idtypeSubject));
    this.teachers = this.teachers.filter(teachers=>teachers.idteacher === parseInt(idteacher));
    this.subjectofstudyService.saveSubject({name: this.typeSubjects[0].name, description: subjdescr, teacherDTO: this.teachers[0], cfu: subjcfu, typeSubjectDTO: this.typeSubject} as Subject).subscribe(subject => {
      console.log(subject);
    });
  }
}
