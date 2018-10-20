import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailDialogComponent } from './classroom-detail-dialog.component';

describe('ClassroomDetailDialogComponent', () => {
  let component: ClassroomDetailDialogComponent;
  let fixture: ComponentFixture<ClassroomDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
