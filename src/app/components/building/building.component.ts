import { Component, OnInit, Input, ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuildingService } from '../../services/building.service';
import { NavbarService } from '../../services/navbar.service';
import { Building } from '../models/Building';
import { User } from '../models/User';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Class } from '../models/Class';
import { ClassroomService } from '../../services/classroom.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ClassroomDetailDialogComponent } from '../classroom-detail-dialog/classroom-detail-dialog.component';
import { AddClassroomDialogComponent } from '../add-classroom-dialog/add-classroom-dialog.component';

import { } from 'googlemaps'

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  user: User;
  building: Building;
  edit: boolean = false;
  valid: boolean = true;
  public latitude: number;
  public longitude: number;

  public searchControl: FormControl;
  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(public mapsAPILoader: MapsAPILoader, public ngZone: NgZone, public buildingService: BuildingService, public nav: NavbarService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.user={
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname
      }};
    this.nav.showNavStaff();
    const id = +this.route.snapshot.paramMap.get('id');
    this.buildingService.getBuildingDetail(id).subscribe(building=>{
      this.building=building;
      this.latitude = this.building.lat;
      this.longitude = this.building.lng;
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
        this.building.lat = place.geometry.location.lat();
        this.building.lng = place.geometry.location.lng();
      });
    });
    autocomplete.setComponentRestrictions
  } catch (e) {
  }
  });
}

setEditable() {
  if(this.edit == false) {
    this.edit = true;
  } else {
    this.edit = false;
  }
}

markerDragEnd($event) {
  console.log($event.coords.lat);
  console.log($event.coords.lng);
  this.building.lat = $event.coords.lat;
  this.building.lng = $event.coords.lng;
}

reset() {
  this.building.lat = this.latitude;
  this.building.lng = this.longitude;
}

save(name, address) {
  if(name == "" || address == "") {
    this.valid =  false;
  } else {
      this.buildingService.saveBuilding({id:this.building.id, name, address, lat:this.building.lat, lng:this.building.lng} as Building).subscribe(building=>{
        console.log(building);
      });
    
  }
  
}

dettagli(idClassroom: number) {
  const modalRef = this.modalService.open(ClassroomDetailDialogComponent);
  modalRef.componentInstance.idClassroom = idClassroom;
  
  modalRef.result.then((result) => {
    for (let c in this.building.classrooms) {
      if(this.building.classrooms[c].id == result.id) {
        this.building.classrooms[c] = result;
      }
    }
  }).catch((error) => {
    console.log(error);
  });
}

aggClasse() {
  const modalRef = this.modalService.open(AddClassroomDialogComponent);
  modalRef.componentInstance.building = this.building;
  
  modalRef.result.then((result) => {
    for (let c in this.building.classrooms) {
      if(this.building.classrooms[c].id == result.id) {
        this.building.classrooms[c] = result;
      }
    }
  }).catch((error) => {
    console.log(error);
  });
}

}
