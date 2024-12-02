import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  const router = inject(Router);
  const toastr = inject(ToastrService);

  // Check if token exists (i.e., user is logged in)
  if (token) {
    return true;
  }

  // Show warning if the user is not logged in
  toastr.warning("You need to Login First");

  // Redirect to the login page
  router.navigateByUrl('login');
  return false;
};

