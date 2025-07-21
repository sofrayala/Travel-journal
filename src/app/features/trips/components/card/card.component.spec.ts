import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { ActivatedRoute } from '@angular/router';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    const editSpy = spyOn(component.tripsService, 'editTrip');
    const navSpy = spyOn(component['router'], 'navigateByUrl');
    component.editTrip(trip);
    expect(editSpy).toHaveBeenCalledWith(trip);
    expect(navSpy).toHaveBeenCalledWith('/card-form');
  });
});
