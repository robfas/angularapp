import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from '../models/Class';
import { Location } from '@angular/common';
import { ClassroomService } from '../../services/classroom.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css']
})
export class ClassroomDetailComponent implements OnInit {
  classroom: Class;

  constructor(public nav: NavbarService, private route: ActivatedRoute, public classroomService: ClassroomService,
    private location: Location) { }

  ngOnInit() {
    this.nav.showNavStaff();
    const id = +this.route.snapshot.paramMap.get('id');
    this.classroomService.getClassroomDetail(id).subscribe(classroom=>{
      this.classroom = classroom;
    });
    
  }

}
