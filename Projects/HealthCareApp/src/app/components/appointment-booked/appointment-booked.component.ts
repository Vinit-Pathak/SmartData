import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, AppointmentState } from '../../store/appointment.state';
import { Store } from '@ngrx/store';
import { moveToWaitingRoom } from '../../store/appointment.action';
import { CommonModule } from '@angular/common';
import { selectAppointmentBooked } from '../../store/appointment.selector';

@Component({
  selector: 'app-appointment-booked',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-booked.component.html',
  styleUrls: ['./appointment-booked.component.css']
})
export class AppointmentBookedComponent {
  appointmentBooked$: Observable<Appointment[]>;

  constructor(private store: Store<{ appointmentState: AppointmentState }>) {
    this.appointmentBooked$ = this.store.select(selectAppointmentBooked);
  }

  moveToWaitingRoom(id: number) {
    this.store.dispatch(moveToWaitingRoom({ id }));
  }
}