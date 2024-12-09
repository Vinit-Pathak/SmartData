import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductsComponent } from './components/products/products.component';
import { LayoutComponent } from './components/layout/layout.component';
import { loginGuardGuard } from './guards/login-guard.guard';
import { authGuardGuard } from './guards/auth-guard.guard';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

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
                canActivate:[loginGuardGuard]
            },
            {
                path:'cart',
                component:CartComponent,
                canActivate:[loginGuardGuard]
            },
            {
                path:'invoice/:id',
                component: InvoiceComponent,
                canActivate:[loginGuardGuard]
            }
        ]
    },
    
];

