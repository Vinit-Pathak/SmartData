import { Routes } from '@angular/router';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PatientComponent } from './components/patient/patient.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { authGuardGuard } from './guards/auth-guard.guard';

export const routes: Routes = [


    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:RegisterLoginComponent
    },
    {
        path:'',
        component: ProfileComponent,
        children:[
            {
                path:'patient',
                component:PatientComponent,
            },
            {
                path:'change-password',
                component:ChangePasswordComponent
            }
        ],
        canActivate: [authGuardGuard]

    },
    {
        path:'**',
        component: ErrorComponent
    }


    // {
    //     path: '',
    //     redirectTo: 'login',
    //     pathMatch: 'full'
    // },
    // {
    //     path: 'login',
    //     component: RegisterLoginComponent
    // },
    // {
    //     path: 'profile',
    //     loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
    //     canActivate: [authGuardGuard],
    //     children: [
    //         {
    //             path: 'patient',
    //             loadComponent: () => import('./components/patient/patient.component').then(m => m.PatientComponent),
    //         },
    //         {
    //             path: 'change-password',
    //             loadComponent: () => import('./components/change-password/change-password.component').then(m => m.ChangePasswordComponent),
    //         }
    //     ]
    // },
    // {
    //     path: '**',
    //     component: ErrorComponent
    // }
];
