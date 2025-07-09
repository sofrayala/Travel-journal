import { NavbarComponent } from '../navbar/navbar.component';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RouterLink } from '@angular/router';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CardComponent, RouterLink, MapComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
