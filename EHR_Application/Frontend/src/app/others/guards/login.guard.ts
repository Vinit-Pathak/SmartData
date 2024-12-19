import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (token) {
    return true;
  }

  toastr.warning('You need to Login First', '', {
    timeOut: 2000,
    progressBar: true,
    progressAnimation: 'increasing',
  });

  router.navigateByUrl('/auth');
  return false;
};
