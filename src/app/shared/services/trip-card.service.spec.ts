import { TestBed } from '@angular/core/testing';

import { TripCardService } from './trip-card.service';

describe('TripCardService', () => {
  let service: TripCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
