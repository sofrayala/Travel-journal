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
  countriesDb: string[] = [];

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const mapboxgl = (await import('mapbox-gl')).default;

      this.map = new mapboxgl.Map({
        accessToken: environment.MAPBOX_TOKEN,
        container: this.mapContainer.nativeElement,
        center: [-98.54818, 40.00811],
        zoom: 1,
      });
    }

    //Get country names from trips db

    const { data, error } = await this.supabaseClient
      .from('trip')
      .select('name');
    if (data) {
      this.countriesDb = data.map((row: any) => row.name);
    }
    console.log(this.countriesDb);
    this.fetchGeocodes();
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
          console.log(
            `Coordinates for ${country}: longitude=${longitude}, latitude=${latitude}`
          );
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
}
