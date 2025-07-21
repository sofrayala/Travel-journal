import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripCardService } from '../../services/trip-card.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-form',
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css',
})
export class CardFormComponent {
  formBuilder = inject(FormBuilder);
  tripsService = inject(TripCardService);
  router = inject(Router);
  tripSelected = this.tripsService.tripSelected;
  http = inject(HttpClient);
  countries: string[] = [];
  private snackBar = inject(MatSnackBar);

  //get countries API

  fetchData() {
    this.http
      .get<any[]>('https://restcountries.com/v3.1/all?fields=name')
      .subscribe({
        next: (response) => {
          this.countries = response
            .map((country) => country.name.common)
            .sort((a: string, b: string) => a.localeCompare(b));
        },
        error: (err) => {
          this.snackBar.open(
            '❌Error loading countries, please try again later',
            'Close',
            {
              duration: 4000,
            }
          );
          console.error('Error loading countries', err);
        },
      });
  }

  //form

  form = this.formBuilder.group({
    name: this.formBuilder.control<string | null>(null, Validators.required),
    startDate: this.formBuilder.control<string | null>(
      null,
      Validators.required
    ),
    endDate: this.formBuilder.control<string | null>(null, Validators.required),
    backgroundImg: this.formBuilder.control<string | null>(
      null,
      Validators.required
    ),
    // Highlight
    food: this.formBuilder.control<string | null>(null, Validators.required),
    view: this.formBuilder.control<string | null>(null, Validators.required),
    nature: this.formBuilder.control<string | null>(null, Validators.required),
    random: this.formBuilder.control<string | null>(null, Validators.required),
  });

  ngOnInit() {
    this.fetchData();
    if (this.tripsService.tripSelected) {
      this.form.setValue({
        name: this.tripsService.tripSelected.name ?? '',
        startDate: this.tripsService.tripSelected.startDate ?? '',
        endDate: this.tripsService.tripSelected.endDate ?? '',
        backgroundImg: this.tripsService.tripSelected.backgroundImg ?? '',
        food: this.tripsService.tripSelected.food ?? '',
        view: this.tripsService.tripSelected.view ?? '',
        nature: this.tripsService.tripSelected.nature ?? '',
        random: this.tripsService.tripSelected.random ?? '',
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
        startDate: this.form.value.startDate ?? '',
        endDate: this.form.value.endDate ?? '',
        backgroundImg: this.form.value.backgroundImg ?? '',
        food: this.form.value.food ?? '',
        view: this.form.value.view ?? '',
        nature: this.form.value.nature ?? '',
        random: this.form.value.random ?? '',
      });
    } else {
      //add
      this.tripsService.addTrip({
        name: this.form.value.name ?? '',
        startDate: this.form.value.startDate ?? '',
        endDate: this.form.value.endDate ?? '',
        backgroundImg: this.form.value.backgroundImg ?? '',
        food: this.form.value.food ?? '',
        view: this.form.value.view ?? '',
        nature: this.form.value.nature ?? '',
        random: this.form.value.random ?? '',
      });
      this.router.navigateByUrl('/profile');
    }
  }
}
