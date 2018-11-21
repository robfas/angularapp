import { Component, OnInit, Input, ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Class } from '../models/Class';
import { BuildingService } from '../../services/building.service';
import { ClassroomService } from '../../services/classroom.service';
import { Building } from '../models/Building';
import { Tool } from '../models/tool';
import { ToolService } from '../../services/tool.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import * as $ from 'jquery';

import { } from 'googlemaps'

@Component({
  selector: 'app-add-classroom-dialog',
  templateUrl: './add-classroom-dialog.component.html',
  styleUrls: ['./add-classroom-dialog.component.css']
})
export class AddClassroomDialogComponent implements OnInit {
  @Input() building: Building;
  classroom: Class;
  selectedBuilding: Building;
  selectedTool: Tool[] = [];
  edit: boolean = false;
  valid: boolean = true;
  tool: Tool[] = [];
  toolTemp: Tool[];
  displayOpt: string = 'none';
  ind: number = 0;
  originalTool: Tool[] = [];
  
  public latitude: number;
  public longitude: number;
  public currentlat: number;
  public currentlng: number;

  public searchControl: FormControl;
  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(public activeModal: NgbActiveModal, public classroomService: ClassroomService,
    public buildingService: BuildingService, public toolService: ToolService,
    public mapsAPILoader: MapsAPILoader, public ngZone: NgZone) { }

  ngOnInit() {
      this.latitude = this.building.lat;
      this.longitude = this.building.lng;
      this.currentlat = this.building.lat;
      this.currentlng = this.building.lng;
      this.toolService.getInstruments().subscribe(instr=>{
        this.tool = instr;
      });
    
    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {   
      try{
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["establishment"]
      });
    
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.classroom.lat = place.geometry.location.lat();
          this.classroom.lng = place.geometry.location.lng();
        });
      });
      autocomplete.setComponentRestrictions
    } catch (e) {
    }
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  setEditable() {
    if(this.edit == false) {
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  save(name, seats) {
    if(name == "" || seats == "") {
      this.valid =  false;
    } else {
      if(this.currentlng == undefined && this.currentlat == undefined) {
        console.log({name, seats, lat:this.latitude, lng:this.longitude, building:this.building, tool:this.selectedTool} as Class)
      
      } else {
        console.log({name, seats, lat:this.currentlat, lng:this.currentlng, building:this.building, tool:this.selectedTool} as Class)
      
      }
        /*this.classroomService.saveClassroom({name, seats, lat:this.classroom.lat, lng:this.classroom.lng, building:this.building, tool:this.selectedTool} as Class).subscribe(classroom=>{
          console.log(classroom);
          this.activeModal.close(classroom);
        });*/
      
    }
    
  }

  instrumentChange(quantity : number, instru) { 
    const index: number = this.selectedTool.indexOf(instru);
      if (index !== -1) {
        if (quantity == 0) {
          this.selectedTool.splice(index, 1);
        } else {
          this.selectedTool[index].quantity = quantity;
        }
         
      } else {
        instru.quantity = quantity;
        this.selectedTool.push(instru);
      } 
      console.log(this.selectedTool)   
    
  }

  markerDragEnd($event) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
    this.currentlat = $event.coords.lat;
    this.currentlng = $event.coords.lng;
  }

  reset() {
    this.currentlat = this.latitude;
    this.currentlng = this.longitude;
  }

}
