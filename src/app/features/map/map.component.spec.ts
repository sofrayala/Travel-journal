import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call router.navigate with correct trip id in goToTrip', () => {
    const router = TestBed.inject(Router);
    component.goToTrip('abc123');
    expect(router.navigate).toHaveBeenCalledWith(['/trip', 'abc123']);
  });

  it('should remove map on ngOnDestroy if map exists', () => {
    component.map = { remove: jasmine.createSpy() };
    component.ngOnDestroy();
    expect(component.map.remove).toHaveBeenCalled();
  });
});
