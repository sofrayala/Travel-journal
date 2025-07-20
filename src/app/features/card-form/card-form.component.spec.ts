import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardFormComponent } from './card-form.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('CardFormComponent', () => {
  let component: CardFormComponent;
  let fixture: ComponentFixture<CardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFormComponent],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call addTrip when newTrip is called and no trip is selected', () => {
    const addSpy = spyOn(component.tripsService, 'addTrip');
    component.form.setValue({
      name: 'Test',
      startDate: '2023-01-01',
      endDate: '2023-01-10',
      backgroundImg: 'img.jpg',
      food: 'Pizza',
      view: 'Sea',
      nature: 'Forest',
      random: 'Surprise',
    });
    component.tripsService.tripSelected = null;
    component.newTrip();
    expect(addSpy).toHaveBeenCalled();
  });
});
