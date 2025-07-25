import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpInterface } from '../../interfaces/sign-up-interface';
import { AuthServiceService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-signup',
  imports: [RouterLink, RouterModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './auth-signup.component.html',
  styleUrl: './auth-signup.component.css',
})
export class AuthSignupComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  submitted = false;

  form = this.formBuilder.group<SignUpInterface>({
    email: this.formBuilder.control(null, [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    terms: this.formBuilder.control(false, [Validators.requiredTrue]),
  });

  async submit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('❌Form not valid, please check all fields', 'Close', {
        duration: 4000,
      });

      return;
    }

    try {
      const authResponse = await this.authService.signUp({
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
      });

      if (authResponse.error) throw authResponse.error;

      this.snackBar
        .open('✅Registration successfull', 'Close', {
          duration: 2000,
        })
        .afterDismissed()
        .subscribe(() => {
          this.router.navigateByUrl('/log-in');
        });
    } catch (error) {
      this.snackBar.open('❌Registration failed', 'Close', {
        duration: 4000,
      });
    }
  }
}
