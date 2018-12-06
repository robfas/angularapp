import { Injectable } from '@angular/core';
import { Building } from '../components/models/Building';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  getAllUrl: string = 'http://localhost:8080/SpringApp/building/getAll';
  getByIdUrl: string = 'http://localhost:8080/SpringApp/building/getById';
  buildingSaveUrl: string = 'http://localhost:8080/SpringApp/building/save';
  imageUrl: string = 'http://localhost:8080/SpringApp/file/upload/building';

  constructor(private http: HttpClient) { }

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
    uploadData.append('file', selectedFile, idBuilding.toString()+ ".jpg");
    return this.http.post(this.imageUrl, uploadData);
  }
  
}
