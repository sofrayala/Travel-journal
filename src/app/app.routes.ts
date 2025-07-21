import { Routes } from '@angular/router';

import { ProfileComponent } from './features/trips/components/profile/profile.component';
import { HomeComponent } from './features/home-page/components/home/home.component';
import { AuthSignupComponent } from './core/auth/features/auth-signup/auth-signup.component';
import { AuthLoginComponent } from './core/auth/features/auth-login/auth-login.component';

import { authGuard } from './core/auth/guards/auth.guard';
import { CardFormComponent } from './features/trips/components/card-form/card-form.component';
import { TripComponent } from './features/trips/components/trip/trip.component';
import { InsightsComponent } from './features/trips/components/insights/insights.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', canActivate: [authGuard], component: ProfileComponent },
  { path: 'sign-up', component: AuthSignupComponent },
  { path: 'log-in', component: AuthLoginComponent },
  { path: 'card-form', component: CardFormComponent },
  { path: 'trip/:id', component: TripComponent },
  { path: 'insights', component: InsightsComponent },
];
