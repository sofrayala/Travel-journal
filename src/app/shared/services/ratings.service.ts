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
      .eq('country', country)
      .eq('user_id', userId)
      .maybeSingle();
    return data;
  }

  async setRating(
    country: string,
    userId: string,
    ratings: { food: number; people: number; scenery: number; vibe: number }
  ) {
    const { error } = await this.supabaseClient
      .from('ratings')
      .upsert([{ country, user_id: userId, ...ratings }], {
        onConflict: 'country,user_id',
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
