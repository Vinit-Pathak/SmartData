import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router =inject(Router)

  const isSessionActive = localStorage.getItem("session") === "true";
  const protectedRoutes = ["/video", ];
  if (protectedRoutes.includes(state.url) && isSessionActive) {
    return true;
  } else {
    router.navigate(["/"]);
    return false;
  }
};
