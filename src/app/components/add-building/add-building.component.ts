import { Component, OnInit, Input, ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from 'googlemaps'

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css']
})
export class AddBuildingComponent implements OnInit {
  user: User;
  valid: boolean = true;
  fileValid: boolean = true;
  building: Building = {};
  public latitude: number;
  public longitude: number;
  toDelete: number;
  newClass: Class;
  selectedFile: File;

  public searchControl: FormControl;
  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(private router:Router, public mapsAPILoader: MapsAPILoader, public ngZone: NgZone, public buildingService: BuildingService, public classroomService: ClassroomService, public nav: NavbarService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      if(JSON.parse(localStorage.getItem('currentUser')).type === 'employee') {
        this.building.lat=40.353291
        this.building.lng=18.174009
      this.user={
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname
      };
    this.nav.showNavStaff();
    console.log('test')
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

markerDragEnd($event) {
  this.building.lat = $event.coords.lat;
  this.building.lng = $event.coords.lng;
}

save(name, address) {
  if(name == "" || address == "") {
    this.valid =  false;
  } else {
    this.building = {
      name: name,
      address: address,
      lat:this.building.lat,
      lng:this.building.lng,
      classrooms:this.building.classrooms}
    this.buildingService.saveBuilding(this.building).subscribe(building=>{
      this.building = building
      if(this.selectedFile !=  undefined) {
        this.buildingService.saveImage(this.selectedFile, this.building.id).subscribe((result) => {
        });
      }
    });
  

    this.sleep(1800).then(() => {
      window.location.replace('/staff/department');
  })
      
  }

  
  
}

sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
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

//aggClasse() {
  /*const modalRef = this.modalService.open(AddClassroomDialogComponent);
  modalRef.componentInstance.building = this.building;
  
  modalRef.result.then((result) => {
    this.buildingService.getBuildingDetail(this.building.id).subscribe(building=>{
      this.building=building;
      this.latitude = this.building.lat;
      this.longitude = this.building.lng;
    });
  }).catch((error) => {
    console.log(error);
  });*/
//}

aggClasse() {
  const modalRef = this.modalService.open(ClassroomDetailDialogComponent);
  this.newClass = {
    id: undefined,
    lat: 40.349159,
    lng: 18.172073
  }
  modalRef.componentInstance.classroom = this.newClass;
  
  modalRef.result.then((result) => {
    if(result != undefined) {
      this.building.classrooms = []
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

}
