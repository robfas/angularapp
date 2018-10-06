import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from '../models/Class';
import { ClassroomService } from '../../services/classroom.service';
import { BuildingService } from '../../services/building.service';
import { InstrumentService } from '../../services/instrument.service';
import { NavbarService } from '../../services/navbar.service';
import { Building } from '../models/Building';
import { Instrument } from '../models/instrument';

@Component({
  selector: 'app-classroom-edit',
  templateUrl: './classroom-edit.component.html',
  styleUrls: ['./classroom-edit.component.css']
})
export class ClassroomEditComponent implements OnInit {
  classroom: Class;
  buildings: Building[];
  instruments: Instrument[];
  
  constructor(public nav: NavbarService, private route: ActivatedRoute, public classroomService: ClassroomService, 
    public instrumentService: InstrumentService, public buildingService: BuildingService) { }

  ngOnInit() {
    this.nav.showNavStaff();
    const id = +this.route.snapshot.paramMap.get('id');
    this.classroomService.getClassroomDetail(id).subscribe(classroom=>{
      this.classroom = classroom;
    });
    this.instrumentService.getInstruments().subscribe(instruments=>{
      this.instruments = instruments;
    });
    this.buildingService.getBuildings().subscribe(buildings=>{
      this.buildings = buildings;
    });
  }

}
