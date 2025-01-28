import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddAppointmentComponent } from "./components/add-appointment/add-appointment.component";
import { AppointmentListComponent } from "./components/appointment-list/appointment-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ AddAppointmentComponent, AppointmentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HealthCareApp';
}
