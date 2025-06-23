import { Injectable, inject, signal, computed } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { TripCardState } from '../interfaces/trip-card-state';
import { AuthServiceService } from './auth/auth.service';

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
      const { data } = await this.supabaseClient.from('trip').select();
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
}
