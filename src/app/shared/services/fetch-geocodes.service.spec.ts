import { TestBed } from '@angular/core/testing';
import { FetchGeocodesService } from './fetch-geocodes.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('FetchGeocodesService', () => {
  let service: FetchGeocodesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        FetchGeocodesService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(FetchGeocodesService);
  });

  it('should call Mapbox API for each country', () => {
    const mapboxgl = {};
    const map = {};
    const countries = ['Spain', 'France'];
    httpClientSpy.get.and.returnValue(of({}));

    service.fetchGeocodes(mapboxgl, map, countries);

    expect(httpClientSpy.get).toHaveBeenCalledTimes(countries.length);
    expect(httpClientSpy.get.calls.argsFor(0)[0]).toContain('Spain');
    expect(httpClientSpy.get.calls.argsFor(1)[0]).toContain('France');
  });
});
