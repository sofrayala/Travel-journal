import { Injectable, inject, signal, computed } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { TripCardState } from '../../features/interfaces/trip-card-state';
import { AuthServiceService } from '../../core/auth/services/auth.service';
import { CardInterface } from '../../features/interfaces/card-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TripCardService {
  private supabaseClient = inject(SupabaseService).supabaseClient;

  private authService = inject(AuthServiceService);

  private state = signal<TripCardState>({
    tripCards: [],
    loading: false,
    error: false,
  });

  tripSelected: CardInterface | null = null;
  router = inject(Router);

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
      alert('Trip added successfully');
      this.getAllTrips();
    } catch (error) {
      console.log(error);
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
        .eq('id', trip.id);
      alert('Trip updated successfully');
      this.getAllTrips();
      this.tripSelected = null;
      this.router.navigateByUrl('/profile');
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTrip(id: string) {
    const confirmed = window.confirm('Sure you want to delete this trip?');
    if (!confirmed) return;
    try {
      const response = await this.supabaseClient
        .from('trip')
        .delete()
        .eq('id', id);
      alert('Trip deleted successfully');
      this.getAllTrips();
      this.router.navigateByUrl('/profile');
    } catch (error) {
      console.log(error);
    }
  }

  async getTripById(id: string) {
    const { data } = await this.supabaseClient
      .from('trip')
      .select('*')
      .eq('id', id)
      .single();
    return data;
  }
}
