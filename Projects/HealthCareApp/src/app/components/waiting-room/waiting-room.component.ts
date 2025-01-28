import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, AppointmentState } from '../../store/appointment.state';
import { Store } from '@ngrx/store';
import { moveToOPD } from '../../store/appointment.action';
import { CommonModule } from '@angular/common';
import { selectWaitingRoom } from '../../store/appointment.selector';

@Component({
  selector: 'app-waiting-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent {
  waitingRoom$: Observable<Appointment[]>;

  constructor(private store: Store<{ appointmentState: AppointmentState }>) {
      this.waitingRoom$ = this.store.select(selectWaitingRoom);
    }

  moveToOPD(id: number) {
    this.store.dispatch(moveToOPD({ id }));
  }
}