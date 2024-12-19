import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (Number(role) === 1) {
    return true;
  }

  toastr.show('You do not have permission. Only Patient Can Access', '', {
    timeOut: 2000,
    progressBar: true,
    progressAnimation: 'increasing',
  });

  router.navigateByUrl('/auth');
  return false;
};
