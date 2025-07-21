import { Component, signal, effect } from '@angular/core';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CommonModule, RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
