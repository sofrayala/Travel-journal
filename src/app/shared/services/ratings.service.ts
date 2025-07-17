import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  private supabaseClient = inject(SupabaseService).supabaseClient;

  async getRating(country: string, userId: string) {
    const { data } = await this.supabaseClient
      .from('ratings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    return data;
  }

  async setRating(
    userId: string,
    tripId: string,
    country: string,
    ratings: { food: number; people: number; scenery: number; vibe: number }
  ) {
    console.log('setRating called with:', { userId, tripId, ratings }); // Debug
    if (!userId || !tripId) {
      throw new Error('userId and tripId must be provided and not empty');
    }
    const { error } = await this.supabaseClient
      .from('ratings')
      .upsert([{ trip_id: tripId, user_id: userId, country, ...ratings }], {
        onConflict: 'trip_id,user_id',
      });
    return error;
  }

  async getRatingsForCountry(country: string) {
    const { data } = await this.supabaseClient
      .from('ratings')
      .select('*')
      .eq('Country', country);
    return data;
  }
}
