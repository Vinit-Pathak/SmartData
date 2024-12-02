import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/org/home/home.component';
import { UsersComponent } from './components/org/users/users.component';
import { ProfileComponent } from './components/org/profile/profile.component';
import { ChatPopupComponent } from './components/org/chat-popup/chat-popup.component';
import { loginGuardGuard } from './guards/login-guard.guard';
import { authGuardGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path:'',
        component:HomeComponent,
        children:[
            {
                path: 'chat',
                component: ChatPopupComponent,
                canActivate:[loginGuardGuard]
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate:[authGuardGuard, loginGuardGuard]
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate:[loginGuardGuard]
            },

        ]
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate:[loginGuardGuard]
      },
    
];
