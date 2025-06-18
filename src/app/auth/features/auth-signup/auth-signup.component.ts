import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-signup',
  imports: [NavbarComponent, RouterLink, RouterModule],
  templateUrl: './auth-signup.component.html',
  styleUrl: './auth-signup.component.css',
})
export class AuthSignupComponent {}
