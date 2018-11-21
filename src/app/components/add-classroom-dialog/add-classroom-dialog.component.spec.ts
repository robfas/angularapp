import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassroomDialogComponent } from './add-classroom-dialog.component';

describe('AddClassroomDialogComponent', () => {
  let component: AddClassroomDialogComponent;
  let fixture: ComponentFixture<AddClassroomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassroomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassroomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
