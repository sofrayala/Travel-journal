import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripCardService } from '../../shared/services/trip-card.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-trip',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent implements OnInit {
  tripId: string | null = null;
  trip: any;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripCardService
  ) {}

  ngOnInit() {
    this.tripId = this.route.snapshot.paramMap.get('id');
    if (this.tripId) {
      this.tripService
        .getTripById(this.tripId)
        .then((trip) => (this.trip = trip));
    }
  }
}
