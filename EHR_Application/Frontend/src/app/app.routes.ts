import { Routes } from '@angular/router';
import { LayoutComponent } from './components/auth/layout/layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PatientRegistrationComponent } from './components/auth/patient-registration/patient-registration.component';
import { ProviderRegistrationComponent } from './components/auth/provider-registration/provider-registration.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path:'auth',
        component: LayoutComponent,
        children:[
            {
                path:'auth/login',
                component:LoginComponent
            },
            {
                path:'auth/patient-registration',
                component: PatientRegistrationComponent
            },
            {
                path:'auth/provider-registration',
                component: ProviderRegistrationComponent
            }
        ]
    }
];
