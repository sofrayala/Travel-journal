import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth.service';

const authService = () => inject(AuthServiceService);

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);

  const { data } = await authService().session();

  if (!data.session) {
    router.navigateByUrl('/log-in');
  }

  return true;
};
