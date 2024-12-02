import { Routes } from '@angular/router';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { ErrorComponent } from './components/error/error.component';
import { VideoCallComponent } from './components/videochat/videochat.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path:'login',
        component:RegisterLoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'video',
                component:VideoCallComponent
            }
        ],
        canActivate:[authGuardGuard]
    },
    
    {
        path:'**',
        component: ErrorComponent
    }
];
