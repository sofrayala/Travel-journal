import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthServiceService } from '../../core/auth/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  userEmail: string | null = null;

  async ngOnInit() {
    const { data } = await this.authService.session();
    this.userEmail = data.session?.user?.email ?? null;
  }

  async logOut() {
    const snackBarRef = this.snackBar.open(
      '❗Are you sure you want to log out?',
      'Log out',
      { duration: 5000 }
    );

    snackBarRef.onAction().subscribe(async () => {
      try {
        await this.authService.signOut();
        this.snackBar.open('✅ You are logged out', 'Close', {
          duration: 4000,
        });
        this.router.navigateByUrl('/log-in');
      } catch (error) {
        this.snackBar.open(
          '❌Something went wrong. Please try again later',
          'Close',
          { duration: 4000 }
        );
      }
    });
  }
}
