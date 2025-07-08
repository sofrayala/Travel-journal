import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../../features/navbar/navbar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpInterface } from '../../../../features/interfaces/sign-up-interface';
import { AuthServiceService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-signup',
  imports: [NavbarComponent, RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './auth-signup.component.html',
  styleUrl: './auth-signup.component.css',
})
export class AuthSignupComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthServiceService);
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
      console.log('Invalid form');
      this.form.markAllAsTouched();
      alert('Form not valid, please check all fields');
      return;
    }

    try {
      const authResponse = await this.authService.signUp({
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
      });

      if (authResponse.error) throw authResponse.error;
      alert('Registration successfull');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  }
}
