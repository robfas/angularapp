import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectTypeComponent } from './subject-type.component';

describe('SubjectTypeComponent', () => {
  let component: SubjectTypeComponent;
  let fixture: ComponentFixture<SubjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
