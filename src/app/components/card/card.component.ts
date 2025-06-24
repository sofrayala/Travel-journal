import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { CardInterface } from '../../interfaces/card-interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthServiceService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TripCardService } from '../../services/trip-card.service';
@Component({
  selector: 'app-card',
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements AfterViewInit {
  private authService = inject(AuthServiceService);

  private router = inject(Router);

  tripsService = inject(TripCardService);

  // tripSelected = this.tripsService.tripSelected;

  // trips = [
  //   {
  //     name: 'Ecuador',
  //     date: 'September 2025',
  //     backgroundImageUrl:
  //       'https://images.pexels.com/photos/30785381/pexels-photo-30785381.jpeg',
  //   },
  //   {
  //     name: 'Germany',
  //     date: 'Agust 2025',
  //     backgroundImageUrl:
  //       'https://images.pexels.com/photos/28954966/pexels-photo-28954966.jpeg',
  //   },
  //   {
  //     name: 'Chamonix',
  //     date: 'October 2025',
  //     backgroundImageUrl:
  //       'https://images.pexels.com/photos/158089/aiguille-du-midi-chamonix-mountain-station-mont-blanc-158089.jpeg',
  //   },
  // ];

  getBackgroundImgStyle(url: string): string {
    return `url('${url}')`;
  }

  ngAfterViewInit() {
    this.tripsService.getAllTrips();
  }

  editTrip(trip: CardInterface) {
    this.tripsService.editTrip(trip);
    this.router.navigateByUrl('/card-form');
  }
}
