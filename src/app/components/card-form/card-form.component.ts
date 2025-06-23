import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripCardService } from '../../services/trip-card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-form',
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css',
})
export class CardFormComponent {
  private formBuilder = inject(FormBuilder);
  private tripsService = inject(TripCardService);
  private router = inject(Router);

  form = this.formBuilder.group({
    name: this.formBuilder.control(null, Validators.required),
    date: this.formBuilder.control(null, Validators.required),
    backgroundImg: this.formBuilder.control(null, Validators.required),
  });

  newTrip() {
    if (this.form.invalid) return;

    this.tripsService.addTrip({
      name: this.form.value.name ?? '',
      date: this.form.value.date ?? '',
      backgroundImg: this.form.value.backgroundImg ?? '',
    });
    this.router.navigateByUrl('/profile');
  }
}
