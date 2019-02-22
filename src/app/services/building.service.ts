import { Injectable } from '@angular/core';
import { Building } from '../components/models/Building';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  getAllUrl: string = 'http://' + this.global.address + ':80/SpringApp/building/getAll';
  getByIdUrl: string = 'http://' + this.global.address + ':80/SpringApp/building/getById';
  buildingSaveUrl: string = 'http://' + this.global.address + ':80/SpringApp/building/save';
  imageUrl: string = 'http://' + this.global.address + ':80/SpringApp/file/upload/building';

  constructor(private http: HttpClient, public global: GlobalService) { }

  getBuildings(): Observable<Building[]>{
    return this.http.get<Building[]>(this.getAllUrl);
  }

  getBuildingDetail(id: number): Observable<Building>{
    return this.http.get<Building>(this.getByIdUrl + '/' + id);
  }

  saveBuilding(building: Building): Observable<Building>{
    return this.http.post<Building>(this.buildingSaveUrl, building, {headers});
  }

  saveImage(selectedFile: File, idBuilding: number): Observable<{}> {
    const uploadData = new FormData();
    uploadData.append('file', selectedFile, selectedFile.name);
    return this.http.post(this.imageUrl + '/' + idBuilding, uploadData);
  }
  
}
