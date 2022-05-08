import { TestBed } from '@angular/core/testing';

import { BaseCommsService } from './base-comms.service';

describe('BaseCommsService', () => {
  let service: BaseCommsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseCommsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
