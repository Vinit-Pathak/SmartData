import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'admin-dashboard',
        component: AdminDashboardComponent
    },
    {
        path:'customer-dashboard',
        component: CustomerDashboardComponent,
        children:[
            {
                path:'',
                redirectTo:'profile',
                pathMatch:'full'
            },
            {
                path:"profile",
                component:ProfileComponent
            }
            
        ]
    },
    
];
