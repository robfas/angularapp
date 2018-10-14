import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  tableVisible: boolean;
  tableArchivedVisible: boolean;

  constructor() {this.tableArchivedVisible, this.tableVisible;}

  showTable(){ this.tableVisible = true; this.tableArchivedVisible = false };

  showArchived() {this.tableVisible = false; this.tableArchivedVisible = true};
}
