import { NavbarComponent } from '../navbar/navbar.component';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CardComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
