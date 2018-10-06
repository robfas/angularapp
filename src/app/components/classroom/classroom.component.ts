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
  valid: boolean;

  constructor(public nav: NavbarService, public buildingService: BuildingService, public classroomService: ClassroomService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.buildingService.getBuildings().subscribe(buildings => {
      this.buildings = buildings;
    });
    this.valid = false;
  }

<<<<<<< HEAD
  searchClassroom(classroom, idtype){
    /*this.postService.saveUserSE({name, surname,email,password,idtype} as UserSE).subscribe(userSE=>{
      console.log(userSE);
    });*/
    console.log(classroom, idtype);
    if (idtype == 0) {
    this.classroomService.getClassrooms().subscribe(classes => {
      this.classes = classes;
      console.log(classes);
    });
  }
    
=======
  searchClassroom(searchClassroom, idBuilding){
    this.valid = true;
      if (idBuilding == 0 && searchClassroom == "") {
        this.classroomService.getAllClassrooms().subscribe(classes => {
          this.classes = classes;
        });
      } else if (idBuilding != 0 && searchClassroom == "") {
        this.classroomService.getClassroomsByBuilding(idBuilding).subscribe(classes => {
          this.classes = classes;
        });
      } else if (idBuilding == 0 && searchClassroom != "") {
        this.classroomService.getClassroomsByName(searchClassroom).subscribe(classes => {
          this.classes = classes;
        });
      } else {
        this.classroomService.getClassroomsByBuildingAndName(idBuilding, searchClassroom).subscribe(classes => {
          this.classes = classes;
        });
      }
>>>>>>> 6a746041c1f6372dc74a26a5337991645fc80f2f
  }

}
