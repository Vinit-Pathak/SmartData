import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, AppointmentState } from '../../store/appointment.state';
import { Store } from '@ngrx/store';
import { deleteAppointment } from '../../store/appointment.action';
import { CommonModule } from '@angular/common';
import { AppointmentBookedComponent } from '../appointment-booked/appointment-booked.component';
import { WaitingRoomComponent } from '../waiting-room/waiting-room.component';
import { OPDComponent } from '../opd/opd.component';
// import { selectAllAppointments } from '../../store/appointment.selector';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, AppointmentBookedComponent, WaitingRoomComponent, OPDComponent],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
  //appointments$: Observable<Appointment[]>;

  // constructor(private store: Store<{ appointmentState: { appointments: Appointment[] } }>) {
  //   this.appointments$ = this.store.select(selectAllAppointments);
  // }


  // constructor(private store: Store<{appointmentState : AppointmentState}>) {
  //   this.appointments$ = this.store.select(selectAllAppointments);
  // }

  // deleteAppointment(id: number) {
  //   console.log('Dispatching Delete Appointment for id: ', id);
  //   this.store.dispatch(deleteAppointment({ id }));
  // }
}