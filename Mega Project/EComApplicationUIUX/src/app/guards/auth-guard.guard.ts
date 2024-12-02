import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const role = sessionStorage.getItem('role');
  const router = inject(Router);
  const toastr = inject(ToastrService);
  
  // Check for role and allow access only if it's '1' (Admin)
  if (Number(role) === 1) {
    return true;
  }

  // Show error message for unauthorized access
  toastr.show("You do not have permission. Only Admin Can Access");
  
  // Redirect to login page instead of product page
  router.navigateByUrl('/login');
  return false;
};

