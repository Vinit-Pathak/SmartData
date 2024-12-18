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
                        redirectTo:'get-patient-appoinments',
                        pathMatch:'full'
                    },
                    {
                        path:'get-patient-appoinments',
                        component: GetPatientAppointmentComponent
                    },
                    {
                        path:'add-patient-appointment',
                        component: AddPatientAppointmentComponent
                    },
                    {
                        path:'patient-profile',
                        component: PatientProfileComponent
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
                        component: GetProviderAppointmentComponent
                    },
                    {
                        path:'add-provider-appointment',
                        component: AddProviderAppointmentComponent
                    },
                    {
                        path:'provider-profile',
                        component: ProviderProfileComponent
                    },
                    {
                        path:'complete-appointment/:id',
                        component: AddSoapNotesComponent
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
