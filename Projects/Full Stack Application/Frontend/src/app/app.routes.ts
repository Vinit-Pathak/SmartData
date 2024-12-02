import { Routes } from '@angular/router';
import { CustomerComponent } from './componenet/customer/customer.component';
import { EmployeeComponent } from './componenet/employee/employee.component';
import { PatientComponent } from './componenet/patient/patient.component';
import { ErrorComponent } from './componenet/error/error.component';

export const routes: Routes = [
    {
        path:'',
        component: CustomerComponent
    },
    {
        path:'employee',
        component: EmployeeComponent
    },
    {
        path:'patient',
        component: PatientComponent
    },
    {
        path:'customer',
        component: CustomerComponent
    },
    {
        path:'**',
        component: ErrorComponent
    }
    
];  
