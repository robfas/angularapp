import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../services/building.service';
import { Building } from '../models/Building';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  buildings: Building[];
  constructor(public buildingService: BuildingService) { }

  ngOnInit() {
    
  }

  getBuildings(): Building[]{
    this.buildingService.getBuildings().subscribe(buildings => {
      this.buildings = buildings;
    });
    return this.buildings;
  }

}
