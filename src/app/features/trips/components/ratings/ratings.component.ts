import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { AuthServiceService } from '../../../../core/auth/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TitleCasePipe } from '@angular/common';
import { TripCardService } from '../../services/trip-card.service';

@Component({
  selector: 'app-ratings',
  imports: [MatSnackBarModule, TitleCasePipe],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.css',
})
export class RatingsComponent implements OnChanges {
  @Input() tripId!: string;
  private snackBar = inject(MatSnackBar);

  ratings = {
    food: 0,
    people: 0,
    scenery: 0,
    vibe: 0,
  };

  loading = false;
  error: string | null = null;
  userId: string | null = null;

  constructor(
    // private ratingsService: RatingsService,
    private authService: AuthServiceService,
    private tripCardService: TripCardService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tripId'] || changes['name']) {
      this.ratings = {
        food: 0,
        people: 0,
        scenery: 0,
        vibe: 0,
      };
      this.loadRatings();
    }
  }

  getCategoryKeys(): (keyof typeof this.ratings)[] {
    return Object.keys(this.ratings) as (keyof typeof this.ratings)[];
  }

  async loadRatings() {
    this.loading = true;
    try {
      const {
        data: { session },
      } = await this.authService.session();
      this.userId = session?.user.id ?? null;

      if (this.userId && this.tripId) {
        // Fetch trip data and set ratings
        const { data, error } = await this.tripCardService.supabaseClient
          .from('trip')
          .select('r_food, r_people, r_scenery, r_vibe')
          .eq('id', this.tripId)
          .maybeSingle();

        if (data) {
          this.ratings = {
            food: data.r_food ?? 0,
            people: data.r_people ?? 0,
            scenery: data.r_scenery ?? 0,
            vibe: data.r_vibe ?? 0,
          };
        }
      } else {
        this.error = 'User not logged in';
      }
    } catch (error) {
      this.error = 'Could not load ratings';
    }
    this.loading = false;
  }

  setLocalRating(category: keyof typeof this.ratings, value: number) {
    this.ratings[category] = value;
  }

  async submitRatings() {
    if (!this.userId) {
      this.error = 'User not logged in';
      return;
    }
    this.loading = true;
    try {
      await this.tripCardService.supabaseClient
        .from('trip')
        .update({
          r_food: this.ratings.food,
          r_people: this.ratings.people,
          r_scenery: this.ratings.scenery,
          r_vibe: this.ratings.vibe,
        })
        .eq('id', this.tripId);
      this.snackBar.open('Ratings submitted succesfully', 'Close', {
        duration: 4000,
      });
      //cleaning stars after sub
      this.ratings = {
        food: 0,
        people: 0,
        scenery: 0,
        vibe: 0,
      };

      this.error = null;
    } catch (error) {
      this.error = 'Could not submit ratings';
    }
    this.loading = false;
  }
}
