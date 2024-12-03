import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductsComponent } from './components/products/products.component';
import { LayoutComponent } from './components/layout/layout.component';
import { loginGuardGuard } from './guards/login-guard.guard';
import { authGuardGuard } from './guards/auth-guard.guard';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';

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
        path:'',
        component: LayoutComponent,
        children:[
            {
                path: 'product',
                component:ProductsComponent,
                canActivate:[loginGuardGuard, authGuardGuard]
            },
            {
                path:'profile',
                component: ProfileComponent,
                canActivate:[loginGuardGuard]
            },
            {
                path:'customer-dashboard',
                component: CustomerDashboardComponent,
            }
        ]
    },
    // {
    //     path:'product',
    //     component:ProductsComponent,
    //     canActivate:['loginGuardGuard', 'authGuardGuard']
    // }
    
];

