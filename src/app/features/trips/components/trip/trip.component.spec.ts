import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripComponent } from './trip.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TripCardService } from '../../services/trip-card.service';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '123' } } },
        },
        {
          provide: TripCardService,
          useValue: {
            getTripById: (id: string) => Promise.resolve({ id }),
            editTrip: jasmine.createSpy(),
            deleteTrip: jasmine.createSpy(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy(),
            navigateByUrl: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTripById on ngOnInit and set trip', async () => {
    await component.ngOnInit();
    expect(component.trip).toEqual({ id: '123' });
  });

  it('should call deleteTrip on tripsService', () => {
    const trip = {
      id: '1',
      name: 'Test',
      startDate: '',
      endDate: '',
      backgroundImg: '',
      user_id: 'test-user',
      food: '',
      view: '',
      nature: '',
      random: '',
    };
    const deleteSpy = component['tripsService'].deleteTrip;
    component.deleteTrip(trip);
    expect(deleteSpy).toHaveBeenCalledWith('1');
  });

  it('should navigate to /profile when goToProfile is called', () => {
    const navSpy = component['router'].navigate;
    component.goToProfile();
    expect(navSpy).toHaveBeenCalledWith(['/profile']);
  });

  it('should call editTrip and navigate to /card-form', () => {
    const trip = {
      id: '1',
      name: 'Test',
      startDate: '',
      endDate: '',
      backgroundImg: '',
      user_id: 'test-user',
      food: '',
      view: '',
      nature: '',
      random: '',
    };
    const editSpy = component['tripsService'].editTrip;
    const navSpy = component['router'].navigateByUrl;
    component.editTrip(trip);
    expect(editSpy).toHaveBeenCalledWith(trip);
    expect(navSpy).toHaveBeenCalledWith('/card-form');
  });
});
