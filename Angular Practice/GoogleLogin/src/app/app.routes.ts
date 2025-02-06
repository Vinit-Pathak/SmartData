import { Routes } from '@angular/router';
import { GoogleLoginComponent } from './Components/google-login/google-login.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'google-login',
        pathMatch:'full'
    },
    {
        path: 'google-login',
        component: GoogleLoginComponent
    },
    {
        path:'home',
        component: HomeComponent
    }
];
