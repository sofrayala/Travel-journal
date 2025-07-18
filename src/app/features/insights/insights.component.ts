import { Component, inject, effect } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { TripCardService } from '../../shared/services/trip-card.service';
import { AuthServiceService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-insights',
  imports: [BaseChartDirective, NavbarComponent],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css',
})
export class InsightsComponent {
  private tripCardService = inject(TripCardService);
  private authService = inject(AuthServiceService);

  colors = [
    '#034159',
    '#03658C',
    '#63BBF2',
    '#63D8F2',
    '#305912',
    '#A1A60A',
    '#F2785C',
  ];

  chartType: ChartType = 'bar';
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Average Country Rating',
        data: [],
        backgroundColor: this.colors,
      },
    ],
  };
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  constructor() {
    effect(async () => {
      const {
        data: { session },
      } = await this.authService.session();
      const userId = session?.user.id;
      if (!userId) return;

      // Fetch all trips for the user
      const { data: trips } = await this.tripCardService.supabaseClient
        .from('trip')
        .select('name, r_food, r_people, r_scenery, r_vibe')
        .eq('user_id', userId);

      if (trips && trips.length > 0) {
        const labels = trips.map((trip: any) => trip.name);
        const averages = trips.map((trip: any) => {
          const ratings = [
            trip.r_food ?? 0,
            trip.r_people ?? 0,
            trip.r_scenery ?? 0,
            trip.r_vibe ?? 0,
          ];

          return ratings.reduce((sum, val) => sum + val, 0) / ratings.length;
        });

        this.chartData.labels = labels;
        this.chartData.datasets[0].data = averages;
      }
    });
  }
}
