import { TestBed } from '@angular/core/testing';

import { SchoolcalendarService } from './schoolcalendar.service';

describe('SchoolcalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolcalendarService = TestBed.get(SchoolcalendarService);
    expect(service).toBeTruthy();
  });
});
