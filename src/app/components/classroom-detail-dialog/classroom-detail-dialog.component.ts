import { Component, OnInit, Input, ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Class } from '../models/Class';
import { BuildingService } from '../../services/building.service';
import { ClassroomService } from '../../services/classroom.service';
import { Building } from '../models/Building';
import { Instrument } from '../models/instrument';
import { InstrumentService } from '../../services/instrument.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

import { } from 'googlemaps'

@Component({
  selector: 'app-classroom-detail-dialog',
  templateUrl: './classroom-detail-dialog.component.html',
  styleUrls: ['./classroom-detail-dialog.component.css']
})
export class ClassroomDetailDialogComponent implements OnInit {
  @Input() idClassroom: number;
  classroom: Class;
  buildings: Building[];
  selectedBuilding: Building;
  selectedInstruments: Instrument[] = [];
  edit: boolean = true;
  instruments: Instrument[] = [];
  instrTemp: Instrument[];
  displayOpt: string = 'none';
  
  public latitude: number;
  public longitude: number;

  public searchControl: FormControl;
  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(public activeModal: NgbActiveModal, public classroomService: ClassroomService,
    public buildingService: BuildingService, public instrumentService: InstrumentService,
    public mapsAPILoader: MapsAPILoader, public ngZone: NgZone) { }

  ngOnInit() {
    this.classroomService.getClassroomDetail(this.idClassroom).subscribe(classroom=>{
      this.classroom = classroom;
      this.latitude = this.classroom.latitude;
      this.longitude = this.classroom.longitude;
      this.instrumentService.getInstruments().subscribe(instrTemp=>{
        for (let i in instrTemp) {
          for (let j in this.classroom.instruments) {
            if (this.classroom.instruments[j].id == instrTemp[i].id) {
              this.selectedInstruments.push(this.classroom.instruments[j]);
              break;
            } else if ( +j == this.classroom.instruments.length - 1) {
              this.instruments.push(instrTemp[i]);
            }
          }
        }
      });
    });
    this.buildingService.getBuildings().subscribe(buildings => {
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

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  setEditable() {
    if(this.edit == true) {
      this.edit = false;
      this.displayOpt = 'none';
    } else {
      this.edit = true;
      this.displayOpt = 'inline';
    }
  }

  go(name, address, seats, quantity) {
    if (this.selectedBuilding == undefined) {
      console.log(name + address + seats + this.classroom.building.name+ " " + quantity);
    } else {
      console.log(name + address + seats + this.selectedBuilding.name + " " + quantity);
    }
    
  }

  actInstruments(instru) {
    if(this.selectedInstruments.indexOf(instru) == -1) {
      console.log('non c è, aggiungo');
      this.selectedInstruments.push(instru);
    } else {
      console.log('rimuovo');
      const index: number = this.selectedInstruments.indexOf(instru);
      if (index !== -1) {
          this.selectedInstruments.splice(index, 1);
      }        
    }
    console.log(this.selectedInstruments);
  }

  onSearchChange(quantity : number, idinstrument: number) {  
    for (let i in this.selectedInstruments) {
      if(this.selectedInstruments[i].id == idinstrument) {
        this.selectedInstruments[i].quantity = quantity;
        break;
      }
    }
    console.log(this.selectedInstruments);
  }

  addInstrument(name: string, quantity: number) {  
    console.log(quantity)
    if(name != undefined) {
      console.log(name);
      this.selectedInstruments.push({id: undefined, name, quantity} as Instrument);
      console.log("aggiunto");
    } else if (quantity != undefined) {
      for (let i in this.selectedInstruments) {
        if(this.selectedInstruments[i].id == undefined) {
          this.selectedInstruments[i].quantity = quantity;
          break;
        }
      }
      console.log("aggiornato");
    }
    console.log(this.selectedInstruments);
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
