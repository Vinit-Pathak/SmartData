import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { appointmentReducer } from './store/appointment.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ appointmentState: appointmentReducer }),
    provideStoreDevtools(),
  ]
};