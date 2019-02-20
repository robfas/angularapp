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
import { } from 'googlemaps'


@Component({
  selector: 'app-classroom-detail-dialog',
  templateUrl: './classroom-detail-dialog.component.html',
  styleUrls: ['./classroom-detail-dialog.component.css']
})
export class ClassroomDetailDialogComponent implements OnInit {
  @Input() classroom: Class;
  buildings: Building[];
  selectedBuilding: Building;
  selectedTool: Tool[] = [];
  edit: boolean = false;
  valid: boolean = true;
  new: boolean = false;
  tool: Tool[] = [];
  toolTemp: Tool[];
  displayOpt: string = 'none';
  ind: number = 0;
  originalTool: Tool[] = [];
  
  public latitude: number;
  public longitude: number;

  public searchControl: FormControl;
  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(public activeModal: NgbActiveModal, public classroomService: ClassroomService,
    public buildingService: BuildingService, public toolService: ToolService,
    public mapsAPILoader: MapsAPILoader, public ngZone: NgZone) { }

  ngOnInit() {
    if (this.classroom.id == undefined) {
      this.new = true;
      this.edit=true;
      try {
      this.toolService.getInstruments().subscribe(instr=>{
        if(this.classroom.tool == undefined || this.classroom.tool.length == 0) {
            this.tool = instr;
        } else {
          for (let i in instr) {
            for (let j in this.classroom.tool) {
              if (this.classroom.tool[j].id == instr[i].id) {
                let presentTool: Tool = this.classroom.tool[j];
                this.selectedTool.push(presentTool);
                this.tool.push(presentTool);
                break;
              } else if ( +j == this.classroom.tool.length - 1) {
                let notPresentTool: Tool = instr[i];
                this.tool.push(notPresentTool);
              }
            }
          }
        }
      });
        //this.originalTool = this.classroom.tool.map(x => Object.assign({}, x)); //deep copy
      } catch (error) {
        
      }
    } else {
      this.originalTool = this.classroom.tool.map(x => Object.assign({}, x)); //deep copy
    this.toolService.getInstruments().subscribe(instr=>{
      if(!this.classroom.tool.length) {
        this.tool = instr
      } else {
        for (let i in instr) {
          for (let j in this.classroom.tool) {
            if (this.classroom.tool[j].id == instr[i].id) {
              let presentTool: Tool = this.classroom.tool[j];
              this.selectedTool.push(presentTool);
              this.tool.push(presentTool);
              break;
            } else if ( +j == this.classroom.tool.length - 1) {
              let notPresentTool: Tool = instr[i];
              this.tool.push(notPresentTool);
            }
          }
        }
      }
      
    });
  }
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
    this.activeModal.close();
  }

  setEditable() {
    if(this.edit == false) {
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  save(id, name, seats) {
    if(name == "" || seats == "") {
      this.valid =  false;
    } else {
        if(this.classroom.building == undefined) {
          this.classroom = {
            id: id,
            name: name,
            seats: seats,
            lat:this.classroom.lat,
            lng:this.classroom.lng,
            building: {
              id: undefined,
              name: undefined
            },
            tool:this.selectedTool
          }
        } else {
          this.classroom = {
            id: id,
            name: name,
            seats: seats,
            lat:this.classroom.lat,
            lng:this.classroom.lng,
            building: {
              id: this.classroom.building.id,
              name: this.classroom.building.name
            },
            tool:this.selectedTool
          }
        }
        
        this.activeModal.close(this.classroom);
    }
    
  }

  instrumentChange(quantity : number, instru) {  
    const index: number = this.selectedTool.indexOf(instru);
      if (index !== -1) {
        if(quantity == 0) {
          this.selectedTool.splice(index, 1);
        } else {
          this.selectedTool[index].quantity = quantity;
        }
      } else {
        instru.quantity = quantity;
        this.selectedTool.push(instru);
      }    
  }

  markerDragEnd($event) {
    this.classroom.lat = $event.coords.lat;
    this.classroom.lng = $event.coords.lng;
  }

  reset() {
    this.classroom.lat = this.latitude;
    this.classroom.lng = this.longitude;
  }

}
