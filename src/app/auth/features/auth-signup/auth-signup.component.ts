import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpInterface } from '../../../interfaces/sign-up-interface';
import { AuthServiceService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-auth-signup',
  imports: [NavbarComponent, RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './auth-signup.component.html',
  styleUrl: './auth-signup.component.css',
})
export class AuthSignupComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthServiceService);

  form = this.formBuilder.group<SignUpInterface>({
    email: this.formBuilder.control(null, [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control(null, [Validators.required]),
  });

  async submit() {
    console.log(this.form.value);
    if (this.form.invalid) return;

    try {
      const authResponse = await this.authService.signUp({
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
      });

      console.log(authResponse);
      if (authResponse.error) throw authResponse.error;
      alert('Please confirm your email');
    } catch (error) {
      console.error(error);
    }
  }
}
