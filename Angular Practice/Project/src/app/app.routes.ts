import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
    {
        path:'home',
        component: HomeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path:'user/profile',
        component:UserProfileComponent
    },
    {
        path: 'admin',
        component: AdminComponent

    },
    {
        path:'admin/profile',
        component: AdminProfileComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
