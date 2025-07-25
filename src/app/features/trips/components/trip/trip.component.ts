import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripCardService } from '../../services/trip-card.service';
import { CommonModule } from '@angular/common';
import { CardInterface } from '../../interfaces/card-interface';
import { RatingsComponent } from '../ratings/ratings.component';
@Component({
  selector: 'app-trip',
  imports: [CommonModule, RatingsComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent implements OnInit {
  tripId: string | null = null;
  trip: any;

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripCardService,
    private router: Router
  ) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  editTrip(trip: CardInterface) {
    this.tripsService.editTrip(trip);
    this.router.navigateByUrl('/card-form');
  }

  deleteTrip(trip: CardInterface) {
    this.tripsService.deleteTrip(trip.id);
  }

  ngOnInit() {
    this.tripId = this.route.snapshot.paramMap.get('id');
    if (this.tripId) {
      this.tripsService
        .getTripById(this.tripId)
        .then((trip) => (this.trip = trip));
    }
  }
}
