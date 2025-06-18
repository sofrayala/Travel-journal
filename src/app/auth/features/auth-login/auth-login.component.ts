import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  imports: [NavbarComponent, RouterLink, RouterModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
})
export class AuthLoginComponent {}
