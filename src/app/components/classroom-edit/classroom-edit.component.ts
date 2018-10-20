import { Component, OnInit, ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { } from 'googlemaps'
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
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
  instruments: Instrument[] = [];
  instrTemp: Instrument[];
  public latitude: number;
  public longitude: number;

  public searchControl: FormControl;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(public nav: NavbarService, private route: ActivatedRoute, public classroomService: ClassroomService, 
    public instrumentService: InstrumentService, public buildingService: BuildingService,
    public mapsAPILoader: MapsAPILoader, public ngZone: NgZone) { }

  ngOnInit() {
    this.nav.showNavStaff();
    const id = +this.route.snapshot.paramMap.get('id');
    this.classroomService.getClassroomDetail(id).subscribe(classroom=>{
      this.classroom = classroom;
      this.latitude = this.classroom.latitude;
      this.longitude = this.classroom.longitude;
      this.instrumentService.getInstruments().subscribe(instrTemp=>{
        for (let i in instrTemp) {
          for (let j in this.classroom.instruments) {
            if (this.classroom.instruments[j].id == instrTemp[i].id) {
              break;
            } else if ( +j == this.classroom.instruments.length - 1) {
              this.instruments.push(instrTemp[i]);
            }
          }
        }
      });
    });
    
    this.buildingService.getBuildings().subscribe(buildings=>{
      this.buildings = buildings;
    });
    
    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
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
          this.classroom.latitude = place.geometry.location.lat();
          this.classroom.longitude = place.geometry.location.lng();
        });
      });
    });
  }
  
  markerDragEnd($event) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
    this.classroom.latitude = $event.coords.lat;
    this.classroom.longitude = $event.coords.lng;
  }

  reset() {
    this.classroom.latitude = this.latitude;
    this.classroom.longitude = this.longitude;
  }

  switch(check: String) {
    console.log(check);
  }
}
