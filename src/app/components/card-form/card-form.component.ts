import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
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
  formBuilder = inject(FormBuilder);
  tripsService = inject(TripCardService);
  router = inject(Router);
  tripSelected = this.tripsService.tripSelected;

  form = this.formBuilder.group({
    name: this.formBuilder.control<string | null>(null, Validators.required),
    date: this.formBuilder.control<string | null>(null, Validators.required),
    backgroundImg: this.formBuilder.control<string | null>(
      null,
      Validators.required
    ),
  });

  ngOnInit() {
    if (this.tripsService.tripSelected) {
      this.form.setValue({
        name: this.tripsService.tripSelected.name,
        date: this.tripsService.tripSelected.date,
        backgroundImg: this.tripsService.tripSelected.backgroundImg,
      });
    }
  }

  newTrip() {
    if (this.form.invalid) return;

    if (this.tripsService.tripSelected) {
      //edit
      this.tripsService.updateTrip({
        id: this.tripsService.tripSelected.id,
        name: this.form.value.name ?? '',
        date: this.form.value.date ?? '',
        backgroundImg: this.form.value.backgroundImg ?? '',
      });
    } else {
      //add
      this.tripsService.addTrip({
        name: this.form.value.name ?? '',
        date: this.form.value.date ?? '',
        backgroundImg: this.form.value.backgroundImg ?? '',
      });
      this.router.navigateByUrl('/profile');
    }
  }
}
