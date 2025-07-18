import { Injectable, inject, signal, computed } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { TripCardState } from '../../features/interfaces/trip-card-state';
import { AuthServiceService } from '../../core/auth/services/auth.service';
import { CardInterface } from '../../features/interfaces/card-interface';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchGeocodesService } from '../fetch-geocodes.service';

@Injectable({
  providedIn: 'root',
})
export class TripCardService {
  supabaseClient = inject(SupabaseService).supabaseClient;

  private authService = inject(AuthServiceService);

  private state = signal<TripCardState>({
    tripCards: [],
    loading: false,
    error: false,
  });

  tripSelected: CardInterface | null = null;
  router = inject(Router);
  private snackBar = inject(MatSnackBar);

  //selectors
  tripCards = computed(() => this.state().tripCards);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  async getAllTrips() {
    try {
      this.state.update((state) => ({
        ...state,
        loading: true,
      }));
      const {
        data: { session },
      } = await this.authService.session();
      const { data } = await this.supabaseClient
        .from('trip')
        .select()
        .eq('user_id', session?.user.id);
      if (data && data.length > 0) {
        this.state.update((state) => ({
          ...state,
          tripCards: data,
        }));
      }
    } catch (error) {
      this.state.update((state) => ({
        ...state,
        error: true,
      }));
    } finally {
      this.state.update((state) => ({
        ...state,
        loading: false,
      }));
    }
  }

  async addTrip(trip: {
    name: string;
    startDate: string;
    endDate: string;
    backgroundImg: string;
    food: string;
    view: string;
    nature: string;
    random: string;
  }) {
    try {
      const {
        data: { session },
      } = await this.authService.session();

      await this.supabaseClient.from('trip').insert({
        user_id: session?.user.id,
        name: trip.name,
        startDate: trip.startDate,
        endDate: trip.endDate,
        backgroundImg: trip.backgroundImg,
        food: trip.food,
        view: trip.view,
        nature: trip.nature,
        random: trip.random,
      });
      this.snackBar.open('✅Trip added successfully', 'Close', {
        duration: 4000,
      });
      this.getAllTrips();
      this.tripSelected = null;
    } catch (error) {
      console.log(error);
      this.snackBar.open(
        '❌Something went wrong. Please try again later',
        'Close',
        {
          duration: 4000,
        }
      );
    }
  }

  editTrip(trip: CardInterface) {
    this.tripSelected = trip;
  }

  async updateTrip(trip: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    backgroundImg: string;
    food: string;
    view: string;
    nature: string;
    random: string;
  }) {
    try {
      const {
        data: { session },
      } = await this.authService.session();
      const currentUserId = session?.user.id;

      const response = await this.supabaseClient
        .from('trip')
        .update({
          name: trip.name,
          startDate: trip.startDate,
          endDate: trip.endDate,
          backgroundImg: trip.backgroundImg,
          food: trip.food,
          view: trip.view,
          nature: trip.nature,
          random: trip.random,
        })
        .eq('id', trip.id)
        .eq('user_id', currentUserId);

      this.snackBar.open('✅Trip updated successfully', 'Close', {
        duration: 4000,
      });
      this.getAllTrips();
      this.tripSelected = null;
      this.router.navigateByUrl('/profile');
    } catch (error) {
      console.log(error);
      this.snackBar.open(
        '❌Something went wrong. Please try again later',
        'Close',
        {
          duration: 4000,
        }
      );
    }
  }

  async deleteTrip(id: string) {
    const snackBarRef = this.snackBar.open(
      '❗Are you sure you want to delete this trip?',
      'Delete',
      { duration: 5000 }
    );

    snackBarRef.onAction().subscribe(async () => {
      try {
        await this.supabaseClient.from('trip').delete().eq('id', id);
        this.snackBar.open('✅ Trip deleted successfully', 'Close', {
          duration: 4000,
        });
        this.getAllTrips();
        this.router.navigateByUrl('/profile');
      } catch (error) {
        this.snackBar.open(
          '❌Something went wrong. Please try again later',
          'Close',
          {
            duration: 4000,
          }
        );
      }
    });
  }

  async getTripById(id: string) {
    const { data } = await this.supabaseClient
      .from('trip')
      .select('*')
      .eq('id', id)
      .single();
    return data;
  }

  ///ratings
  async updateTripRatings(
    tripId: string,
    ratings: {
      r_food: number;
      r_people: number;
      r_scenery: number;
      r_vibe: number;
    }
  ) {
    const { error } = await this.supabaseClient
      .from('trip')
      .update(ratings)
      .eq('id', tripId);
    return error;
  }
}
