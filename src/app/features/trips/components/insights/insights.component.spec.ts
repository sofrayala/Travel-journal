import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsComponent } from './insights.component';
import { TripCardService } from '../../shared/services/trip-card.service';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../core/auth/services/auth.service';

describe('InsightsComponent', () => {
  let component: InsightsComponent;
  let fixture: ComponentFixture<InsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        {
          provide: TripCardService,
          useValue: {
            supabaseClient: {
              from: () => ({
                select: () => ({
                  eq: () =>
                    Promise.resolve({
                      data: [
                        {
                          name: 'Spain',
                          r_food: 5,
                          r_people: 4,
                          r_scenery: 5,
                          r_vibe: 4,
                        },
                      ],
                    }),
                }),
              }),
            },
          },
        },
        {
          provide: AuthServiceService,
          useValue: {
            session: () =>
              Promise.resolve({
                data: { session: { user: { id: 'test-user' } } },
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have chartData and lineChartData defined', () => {
    expect(component.chartData).toBeDefined();
    expect(component.lineChartData).toBeDefined();
  });

  it('should fetch trips and set chart data', async () => {
    await fixture.whenStable();
    expect(component.chartData.labels).toEqual(['Spain']);
    expect(component.chartData.datasets[0].data).toEqual([4.5]);
    expect(component.lineChartData.labels).toEqual(['Spain']);
    expect(component.lineChartData.datasets[0].data).toEqual([5]);
    expect(component.lineChartData.datasets[1].data).toEqual([4]);
    expect(component.lineChartData.datasets[2].data).toEqual([5]);
    expect(component.lineChartData.datasets[3].data).toEqual([4]);
    expect(component.loading).toBeFalse();
  });
});
