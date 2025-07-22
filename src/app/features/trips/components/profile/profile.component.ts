import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-profile',
  imports: [CardComponent, MapComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
