import { Component, OnInit, Inject  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from '../../services/navbar.service';
import { BuildingService } from '../../services/building.service';
import { ClassroomService } from '../../services/classroom.service';
import { Building } from '../models/Building';
import { Class } from '../models/Class';
import { ClassroomDetailDialogComponent } from '../classroom-detail-dialog/classroom-detail-dialog.component';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  buildings: Building[];
  classes: Class[];
  valid: boolean;
  classroom : Class;
  nomeProdotto: String;

  constructor(public nav: NavbarService, public buildingService: BuildingService, public classroomService: ClassroomService, private modalService: NgbModal) { }

  ngOnInit() {
    this.nav.showNavStaff();
    this.buildingService.getBuildings().subscribe(buildings => {
      this.buildings = buildings;
    });
    this.valid = false;
  }

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
  }

  dettagli(idClassroom: number) {
    const modalRef = this.modalService.open(ClassroomDetailDialogComponent);
    modalRef.componentInstance.idClassroom = idClassroom;
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}



