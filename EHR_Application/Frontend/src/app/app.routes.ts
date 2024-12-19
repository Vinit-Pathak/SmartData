import { Routes } from '@angular/router';
import { LayoutComponent } from './components/auth/layout/layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PatientRegistrationComponent } from './components/auth/patient-registration/patient-registration.component';
import { ProviderRegistrationComponent } from './components/auth/provider-registration/provider-registration.component';
import { HomeComponent } from './components/org/home/home.component';
import { PatientDashboardComponent } from './components/org/patient-dashboard/patient-dashboard.component';
import { ProviderDashboardComponent } from './components/org/provider-dashboard/provider-dashboard.component';
import { GetPatientAppointmentComponent } from './components/org/patient/get-patient-appointment/get-patient-appointment.component';
import { AddPatientAppointmentComponent } from './components/org/patient/add-patient-appointment/add-patient-appointment.component';
import { GetProviderAppointmentComponent } from './components/org/provider/get-provider-appointment/get-provider-appointment.component';
import { AddProviderAppointmentComponent } from './components/org/provider/add-provider-appointment/add-provider-appointment.component';
import { ProfileComponent } from './components/org/patient/profile/profile.component';
import { PatientProfileComponent } from './components/org/patient/patient-profile/patient-profile.component';
import { ProviderProfileComponent } from './components/org/provider/provider-profile/provider-profile.component';
import { AddSoapNotesComponent } from './components/org/provider/add-soap-notes/add-soap-notes.component';
import { AllAppointmentsComponent } from './components/org/provider/all-appointments/all-appointments.component';
import { PatientPastAppointmentComponent } from './components/org/patient/patient-past-appointment/patient-past-appointment.component';
import { loginGuard } from './others/guards/login.guard';
import { authGuard } from './others/guards/auth.guard';

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
                path:'login',
                component:LoginComponent
            },
            {
                path:'patient-registration',
                component: PatientRegistrationComponent
            },
            {
                path:'provider-registration',
                component: ProviderRegistrationComponent
            }
        ]
    },
    {
        path:'home',
        component: HomeComponent,
        children:[
            {
                path:'patient-dashboard',
                component: PatientDashboardComponent,
                children:[
                    {
                        path:'',
                        redirectTo:'get-patient-appointments',
                        pathMatch:'full'
                    },
                    {
                        path:'get-patient-appointments',
                        component: GetPatientAppointmentComponent,
                        canActivate:[loginGuard]
                    },
                    {
                        path:'add-patient-appointment',
                        component: AddPatientAppointmentComponent,
                        canActivate:[loginGuard]
                    },
                    {
                        path:'patient-profile',
                        component: PatientProfileComponent,
                        canActivate:[loginGuard]
                    },
                    {
                        path:'past-appointments',
                        component:PatientPastAppointmentComponent,
                        canActivate:[loginGuard]
                    }
                ]
            },
            {
                path:'provider-dashboard',
                component: ProviderDashboardComponent,
                children:[
                    {
                        path:'',
                        redirectTo:'get-provider-appointments',
                        pathMatch:'full'
                    },
                    {
                        path:'get-provider-appointments',
                        component: GetProviderAppointmentComponent,
                        canActivate:[loginGuard]
                    },
                    {
                        path:'add-provider-appointment',
                        component: AddProviderAppointmentComponent,
                        canActivate:[loginGuard]
                    },
                    {
                        path:'provider-profile',
                        component: ProviderProfileComponent,
                        canActivate:[loginGuard]
                    },
                    {
                        path:'complete-appointment/:appointmentId',
                        component: AddSoapNotesComponent,
                        canActivate:[loginGuard]
                    },{
                        path:'past-appointments',
                        component:AllAppointmentsComponent,
                        canActivate:[loginGuard]
                    }
                ]
            },
            // {
            //     path:'profile',
            //     component: ProfileComponent
            // }
        ]
    }
];
