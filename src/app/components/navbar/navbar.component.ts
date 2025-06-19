import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthServiceService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private authService = inject(AuthServiceService);

  private router = inject(Router);

  async logOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('/log-in');
    alert('You are logged out');
  }
}
