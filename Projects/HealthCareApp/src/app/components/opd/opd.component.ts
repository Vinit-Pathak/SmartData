import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, AppointmentState } from '../../store/appointment.state';
import { Store } from '@ngrx/store';
import { removeFromOPD } from '../../store/appointment.action';
import { CommonModule } from '@angular/common';
import { selectOPD } from '../../store/appointment.selector';

@Component({
  selector: 'app-opd',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opd.component.html',
  styleUrls: ['./opd.component.css']
})
export class OPDComponent {
  opd$: Observable<Appointment[]>;

  constructor(private store: Store<{ appointmentState: AppointmentState }>) {
    this.opd$ = this.store.select(selectOPD);
  }

  removeFromOPD(id: number) {
    this.store.dispatch(removeFromOPD({ id }));
  }
}