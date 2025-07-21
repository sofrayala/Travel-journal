import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../../features/layout/navbar/navbar.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogInInterface } from '../../interfaces/log-in-interface';
import { AuthServiceService } from '../../services/auth.service';
import { TripCardService } from '../../../../features/trips/services/trip-card.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-login',
  imports: [
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    NavbarComponent,
    MatSnackBarModule,
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
})
export class AuthLoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  tripService = inject(TripCardService);
  private snackBar = inject(MatSnackBar);

  form = this.formBuilder.group<LogInInterface>({
    email: this.formBuilder.control(null, [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control(null, [Validators.required]),
  });

  async submit() {
    if (this.form.invalid) {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 4000,
      });
      this.form.markAllAsTouched();
      return;
    }

    try {
      const { error } = await this.authService.logIn({
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
      });

      if (error) {
        this.snackBar.open('❌Incorrect email or password', 'Close', {
          duration: 4000,
        });
        console.error('Login failed:', error);
        return;
      }

      this.snackBar.open('✅Logged in', 'Close', {
        duration: 4000,
      });
      this.tripService.getAllTrips();
      window.location.href = '/profile';
    } catch (unexpectedError) {
      console.error(
        'An unexpected error occurred during login:',
        unexpectedError
      );
      this.snackBar.open(
        '❌Something went wrong. Please try again later',
        'Close',
        {
          duration: 4000,
        }
      );
    }
  }
}
