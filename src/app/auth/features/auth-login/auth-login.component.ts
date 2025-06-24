import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogInInterface } from '../../../interfaces/log-in-interface';
import { AuthServiceService } from '../../../services/auth/auth.service';
import { TripCardService } from '../../../services/trip-card.service';

@Component({
  selector: 'app-auth-login',
  imports: [NavbarComponent, RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
})
export class AuthLoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  tripService = inject(TripCardService);

  form = this.formBuilder.group<LogInInterface>({
    email: this.formBuilder.control(null, [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control(null, [Validators.required]),
  });

  async submit() {
    if (this.form.invalid) return;
    try {
      const { error } = await this.authService.logIn({
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
      });
      // this.router.navigateByUrl('/profile');
      console.log('Logged in!');
      // this.tripService.getAllTrips();
      window.location.href = '/profile';
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
