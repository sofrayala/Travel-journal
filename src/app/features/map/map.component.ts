import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SupabaseService } from '../../shared/services/supabase.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { FetchGeocodesService } from '../../shared/fetch-geocodes.service';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map: any;
  private platformId = inject(PLATFORM_ID);
  private supabaseClient = inject(SupabaseService).supabaseClient;
  private http = inject(HttpClient);
  private router = inject(Router);
  // private fetchGeocodesService = inject(FetchGeocodesService);
  countriesDb: string[] = [];
  trips: any[] = [];
  mapboxgl: any;

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.mapboxgl = (await import('mapbox-gl')).default;

      this.map = new this.mapboxgl.Map({
        accessToken: environment.MAPBOX_TOKEN,
        container: this.mapContainer.nativeElement,
        center: [-78, -0.5],
        zoom: 3,
      });
    }

    //Get country names from trips db

    const { data, error } = await this.supabaseClient
      .from('trip')
      .select('id, name, backgroundImg');
    if (data) {
      this.countriesDb = data.map((row: any) => row.name);
      this.trips = data;
    }
    this.fetchGeocodes();
    // this.fetchGeocodesService.fetchGeocodes(
    //   this.mapboxgl,
    //   this.map,
    //   this.countriesDb
    // );
  }

  fetchGeocodes() {
    for (const country of this.countriesDb) {
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

          //get img for map
          let tripImg = '';
          let tripId = '';

          if (this.trips && Array.isArray(this.trips)) {
            const trip = this.trips.find((t: any) => t.name === country);
            tripImg = trip?.backgroundImg || '';
            tripId = trip?.id || '';
          }

          const popupHtml = `
          <div class="popup-trip-link" data-trip-id="${tripId}" style="display:flex;align-items:center;justify-content:center;">
            ${
              tripImg
                ? `<img src="${tripImg}" alt="${country}" style="width:65px; height:65px;object-fit:cover;border-radius:8px;" />`
                : ''
            }
          </div>
        `;

          if (this.map) {
            // popup
            const popup = new this.mapboxgl.Popup({
              className: 'popup',
            })
              .setHTML(popupHtml)
              .setMaxWidth('100px');

            //marker
            new this.mapboxgl.Marker({
              color: 'blue',
              className: 'marker',
            })
              .setLngLat([+longitude, +latitude])
              .setPopup(popup)
              .addTo(this.map);
            popup.on('open', () => {
              const el = document.querySelector('.popup-trip-link');
              if (el) {
                el.addEventListener('click', (event) => {
                  const clickedTripId = (
                    event.currentTarget as HTMLElement
                  ).getAttribute('data-trip-id');
                  console.log('Popup clicked', { clickedTripId });
                  if (clickedTripId) {
                    this.goToTrip(clickedTripId); // Use your function here
                  } else {
                    console.log('No tripId found for this marker.');
                  }
                });
              } else {
                console.log('Popup element not found in DOM.');
              }
            });
          }
        },
        error: (err) => {
          console.error(`Error fetching geocode for ${country}`, err);
        },
      });
    }
  }
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  goToTrip(id: string) {
    this.router.navigate(['/trip', id]);
  }
}
