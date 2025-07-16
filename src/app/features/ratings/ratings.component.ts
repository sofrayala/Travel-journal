import { Component, Input, OnInit } from '@angular/core';
import { RatingsService } from '../../shared/services/ratings.service';
import { AuthServiceService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-ratings',
  imports: [],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.css',
})
export class RatingsComponent {
  @Input() country!: string;

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
    private ratingsService: RatingsService,
    private authService: AuthServiceService
  ) {}

  getCategoryKeys(): (keyof typeof this.ratings)[] {
    return Object.keys(this.ratings) as (keyof typeof this.ratings)[];
  }

  async ngOnInit() {
    this.loading = true;
    try {
      const {
        data: { session },
      } = await this.authService.session();
      this.userId = session?.user.id ?? null;

      if (this.userId) {
        const data = await this.ratingsService.getRating(
          this.country,
          this.userId
        );
        if (data) {
          this.ratings = {
            food: data.food,
            people: data.people,
            scenery: data.scenery,
            vibe: data.vibe,
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
      await this.ratingsService.setRating(
        this.country,
        this.userId,
        this.ratings
      );
      console.log(this.country, this.userId, this.ratings);
      this.error = null;
    } catch (error) {
      this.error = 'Could not submit ratings';
    }
    this.loading = false;
  }
}
