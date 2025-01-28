import { createAction, props } from '@ngrx/store';
import { Appointment } from './appointment.state';

export const addAppointment = createAction(
  '[Appointment] Add Appointment',
  props<{ appointment: Appointment }>()
);

export const moveToWaitingRoom = createAction(
  '[Appointment] Move to Waiting Room',
  props<{ id: number }>()
);

export const moveToOPD = createAction(
  '[Appointment] Move to OPD',
  props<{ id: number }>()
);

export const removeFromOPD = createAction(
  '[Appointment] Remove from OPD',
  props<{ id: number }>()
);
