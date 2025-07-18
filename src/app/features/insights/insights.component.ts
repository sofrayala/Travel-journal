import {
  Component,
  inject,
  effect,
  ChangeDetectorRef,
  viewChild,
  ViewChild,
} from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);
  private viewReady = false;
  loading = true;
  // @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('barChart') barChart?: BaseChartDirective;
  @ViewChild('lineChart') lineChart?: BaseChartDirective;

  colors = [
    '#034159',
    '#03658C',
    '#63BBF2',
    '#63D8F2',
    '#305912',
    '#A1A60A',
    '#F2785C',
  ];

  updateCharts() {
    this.cdr.detectChanges();
    setTimeout(() => {
      this.barChart?.update();
      this.lineChart?.update();
    }, 0);
  }

  //Average-bar
  chartType: ChartType = 'bar';
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: this.colors,
      },
    ],
  };
  chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  //line

  lineChartType: ChartType = 'line';
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Food',
        data: [],
        borderColor: '#034159',
        backgroundColor: 'rgba(3,65,89,0.2)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'People',
        data: [],
        borderColor: '#03658C',
        backgroundColor: '#63D8F2',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Scenery',
        data: [],
        borderColor: '#305912',
        backgroundColor: '#A1A60A',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Vibe',
        data: [],
        borderColor: '#F2785C',
        backgroundColor: 'rgba(242,120,92,0.2)',
        fill: false,
        tension: 0.4,
      },
    ],
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  ngAfterViewInit() {
    this.viewReady = true;
  }

  constructor() {
    effect(async () => {
      this.loading = true;
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

        const foodAverages = trips.map((trip: any) => trip.r_food ?? 0);
        const peopleAverages = trips.map((trip: any) => trip.r_people ?? 0);
        const sceneryAverages = trips.map((trip: any) => trip.r_scenery ?? 0);
        const vibeAverages = trips.map((trip: any) => trip.r_vibe ?? 0);

        //bar
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

        // Line chart
        this.lineChartData.labels = labels;
        this.lineChartData.datasets[0].data = foodAverages;
        this.lineChartData.datasets[1].data = peopleAverages;
        this.lineChartData.datasets[2].data = sceneryAverages;
        this.lineChartData.datasets[3].data = vibeAverages;

        if (this.viewReady) {
          this.updateCharts();
        }
      }
      this.loading = false;
    });
  }
}
