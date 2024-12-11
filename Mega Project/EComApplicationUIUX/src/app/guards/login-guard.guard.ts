import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (token) {
    return true;
  }

  toastr.warning("You need to Login First");

  router.navigateByUrl('login');
  return false;
};

