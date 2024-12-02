import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils/session';

export const authGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const session = inject(UtilsService);
  
  const isSessionActive = localStorage.getItem("session") === "true";
  const protectedRoutes = ["/patient", "/change-password"];
  
  if (protectedRoutes.includes(state.url) && isSessionActive) {
    return true;
  } else {
    router.navigate(["/"]);
    return false;
  }
};