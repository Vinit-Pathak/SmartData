import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const role=sessionStorage.getItem('role')
  const router = inject(Router);
  const toastr=inject(ToastrService)
  if(role=="Admin"){
    return true;
  }

  toastr.show("You do not have permission. Only Admin Can Access")
  router.navigateByUrl('/chat')
  return false;
};
