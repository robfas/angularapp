import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { BuildingService } from '../../services/building.service';
import { ClassroomService } from '../../services/classroom.service';
import { Building } from '../models/Building';
import { Class } from '../models/Class';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  buildings: Building[];
  classes: Class[];

  constructor(public nav: NavbarService, public buildingService: BuildingService, public classroomService: ClassroomService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.buildingService.getBuildings().subscribe(buildings => {
      this.buildings = buildings;
    });
  }

  searchClassroom(classroom, idtype){
    /*this.postService.saveUserSE({name, surname,email,password,idtype} as UserSE).subscribe(userSE=>{
      console.log(userSE);
    });*/
    console.log(classroom, idtype);
    if (idtype == 0) {
    this.classroomService.getClassrooms().subscribe(classes => {
      this.classes = classes;
    });
  }
    
  }

}
