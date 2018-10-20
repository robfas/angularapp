import { TestBed, inject } from '@angular/core/testing';

import { SubjectofstudyService } from './subjectofstudy.service';

describe('SubjectofstudyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectofstudyService]
    });
  });

  it('should be created', inject([SubjectofstudyService], (service: SubjectofstudyService) => {
    expect(service).toBeTruthy();
  }));
});
