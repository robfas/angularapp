import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSEComponent } from './users-se.component';

describe('UsersSEComponent', () => {
  let component: UsersSEComponent;
  let fixture: ComponentFixture<UsersSEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
