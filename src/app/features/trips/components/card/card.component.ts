import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { CardInterface } from '../../interfaces/card-interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthServiceService } from '../../../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TripCardService } from '../../services/trip-card.service';
@Component({
  selector: 'app-card',
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements AfterViewInit {
  private authService = inject(AuthServiceService);

  private router = inject(Router);

  tripsService = inject(TripCardService);

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

  deleteTrip(trip: CardInterface) {
    this.tripsService.deleteTrip(trip.id);
  }

  goToTrip(id: string) {
    this.router.navigate(['/trip', id]);
  }
}
