import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CustomerComponent } from "./componenet/customer/customer.component";
import { EmployeeComponent } from "./componenet/employee/employee.component";
import { PatientComponent } from "./componenet/patient/patient.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, EmployeeComponent, PatientComponent, CustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
