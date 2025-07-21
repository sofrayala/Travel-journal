import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MapComponent } from '../map/map.component';
import { FooterComponent } from '../../../layout/footer/footer.component';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CardComponent, MapComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
