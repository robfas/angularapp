import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCalendar2Component } from './school-calendar2.component';

describe('SchoolCalendar2Component', () => {
  let component: SchoolCalendar2Component;
  let fixture: ComponentFixture<SchoolCalendar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolCalendar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCalendar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
