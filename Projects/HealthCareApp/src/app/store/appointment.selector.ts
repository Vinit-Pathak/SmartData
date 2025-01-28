import { createSelector } from '@ngrx/store';
import { AppointmentState } from './appointment.state';

export const selectAppointmentState = (state: { appointmentState: AppointmentState }) => state.appointmentState;

export const selectWaitingRoom = createSelector(
  selectAppointmentState,
  (state: AppointmentState) => state.waitingRoom
);

export const selectAppointmentBooked = createSelector(
  selectAppointmentState,
  (state: AppointmentState) => state.appointmentBooked
);

export const selectOPD = createSelector(
  selectAppointmentState,
  (state: AppointmentState) => state.opd
);