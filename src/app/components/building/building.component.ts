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
import { Router } from '@angular/router';
import { } from 'googlemaps'

declare var require: (filename: string) => any;

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
  toDelete: number;
  newClass: Class;
  selectedFile: File;
  fileValid: boolean = true;
  

  public searchControl: FormControl;
  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(public mapsAPILoader: MapsAPILoader, private router: Router, public ngZone: NgZone, public buildingService: BuildingService, public classroomService: ClassroomService, public nav: NavbarService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type == 'employee') {
      this.user={
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname
      };
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
  } else {
    this.router.navigate(['/teacher']);
    this.searchControl = new FormControl();
  }
  } else {
    this.router.navigate(['/']);
    this.searchControl = new FormControl();
  }
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
    this.building = {
      id:this.building.id,
      name,
      address,
      lat:this.building.lat,
      lng:this.building.lng,
      classrooms:this.building.classrooms}
    this.buildingService.saveBuilding(this.building).subscribe(building=>{
      console.log(building)
      this.building = building
      if(this.selectedFile !=  undefined) {
      this.buildingService.saveImage(this.selectedFile, this.building.id).subscribe((result) => {
        console.log(result)
      });
    }
      });

      /*this.buildingService.getBuildingDetail(this.building.id).subscribe(building=>{
        this.building=building;
        this.latitude = this.building.lat;
        this.longitude = this.building.lng;
      });*/
  }
  
}

dettagli(classroom: Class) {
  const modalRef = this.modalService.open(ClassroomDetailDialogComponent);
  if(classroom.id == undefined) {
    //const JSON = require('circular-json');
    modalRef.componentInstance.classroom = (JSON.parse(JSON.stringify(classroom)));
  } else {
    modalRef.componentInstance.classroom = (JSON.parse(JSON.stringify(classroom)));
  }
  modalRef.result.then((result) => {
    if(result != undefined) {
      for (let c in this.building.classrooms) {
        if(this.building.classrooms[c].id == result.id) {
          this.building.classrooms[c] = result;
        }
  
      }
    }
    
  }).catch((error) => {
    console.log(error);
  });
}

aggClasse() {
  const modalRef = this.modalService.open(ClassroomDetailDialogComponent);
  this.newClass = {
    id: undefined,
    building: this.building,
    lat: this.building.lat,
    lng: this.building.lng
  }
  modalRef.componentInstance.classroom = this.newClass;
  
  modalRef.result.then((result) => {
    if(result != undefined) {
      this.building.classrooms.push(result);
    }
    
  }).catch((error) => {
    console.log(error);
  });
}

onFileChanged(event) {
  if(event.target.files[0].name.split(".").pop() == "jpg") {
    this.selectedFile = event.target.files[0]
    this.fileValid =  true;
  } else {
    event.target.value = '';
    this.fileValid = false;
  }
}

/*aggClasse() {
  const modalRef = this.modalService.open(AddClassroomDialogComponent);
  modalRef.componentInstance.building = this.building;
  
  modalRef.result.then((result) => {
    this.building.classrooms.push(result);
    
  }).catch((error) => {
    console.log(error);
  });
}*/

/*aggClasse() {
  const modalRef = this.modalService.open(AddClassroomDialogComponent);
  modalRef.componentInstance.building = this.building;
  
  modalRef.result.then((result) => {
    this.buildingService.getBuildingDetail(this.building.id).subscribe(building=>{
      this.building=building;
      this.latitude = this.building.lat;
      this.longitude = this.building.lng;
    });
  }).catch((error) => {
    console.log(error);
  });
}*/

}
