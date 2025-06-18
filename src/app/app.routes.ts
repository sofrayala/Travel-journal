import { Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AuthSignupComponent } from './auth/features/auth-signup/auth-signup.component';
import { AuthLoginComponent } from './auth/features/auth-login/auth-login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'sign-up', component: AuthSignupComponent },
  { path: 'log-in', component: AuthLoginComponent },
];
