import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const restrictGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (token && role) {
    if (Number(role) === 1) {
      router.navigateByUrl('product');
    }else if(Number(role) === 2){
      router.navigateByUrl('customer-dashboard');
    }
    return false;
  }

  return true;
};
