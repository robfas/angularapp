import { TestBed, inject } from '@angular/core/testing';

import { TicketMessageService } from './ticketMessage.service';

describe('TicketMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketMessageService]
    });
  });

  it('should be created', inject([TicketMessageService], (service: TicketMessageService) => {
    expect(service).toBeTruthy();
  }));
});
