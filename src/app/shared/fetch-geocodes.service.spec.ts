import { TestBed } from '@angular/core/testing';

import { FetchGeocodesService } from './fetch-geocodes.service';

describe('FetchGeocodesService', () => {
  let service: FetchGeocodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchGeocodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
