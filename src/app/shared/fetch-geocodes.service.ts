import { Injectable } from '@angular/core';
import { ElementRef, ViewChild, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SupabaseService } from './services/supabase.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FetchGeocodesService {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map: any;
  private platformId = inject(PLATFORM_ID);
  private supabaseClient = inject(SupabaseService).supabaseClient;
  private http = inject(HttpClient);
  countriesDb: string[] = [];

  // async ngOnInit() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.mapboxgl = (await import('mapbox-gl')).default;

  //     this.map = new this.mapboxgl.Map({
  //       accessToken: environment.MAPBOX_TOKEN,
  //       container: this.mapContainer.nativeElement,
  //       center: [-78, -0.5],
  //       zoom: 3,
  //     });
  //   }

  //   //Get country names from trips db

  //   const { data, error } = await this.supabaseClient
  //     .from('trip')
  //     .select('name');
  //   if (data) {
  //     this.countriesDb = data.map((row: any) => row.name);
  //   }
  //   this.fetchGeocodes();
  // }

  fetchGeocodes(mapboxgl: any, map: any, countriesDb: any) {
    for (const country of countriesDb) {
      const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
        country
      )}&access_token=${environment.MAPBOX_TOKEN}`;
      this.http.get<any>(url).subscribe({
        next: (result) => {
          const feature = result?.features?.[0];
          // ----------------------------------------
          // TODO: Mejorar manejo de error
          // ----------------------------------------
          if (!feature) {
            return console.log(`No coordiantes info for this ${country}`);
          }
          const [longitude, latitude] =
            result?.features?.[0].geometry.coordinates;

          if (map) {
            // popup
            const popup = new mapboxgl.Popup({
              className: 'popup',
            })
              .setHTML(`<p>${country}</p>`)
              .setMaxWidth('300px');

            //marker
            new mapboxgl.Marker({
              color: 'blue',
              className: 'marker',
            })
              .setLngLat([+longitude, +latitude])
              .setPopup(popup)
              .addTo(map);
          }
        },
        error: (err) => {
          console.error(`Error fetching geocode for ${country}`, err);
        },
      });
    }
  }
  // ngOnDestroy(): void {
  //   if (this.map) {
  //     this.map.remove();
  //   }
  // }
}
