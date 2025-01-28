import { createReducer, on } from '@ngrx/store';
import { initialState } from './appointment.state';
import {
  addAppointment,
  moveToWaitingRoom,
  moveToOPD,
  removeFromOPD,
} from './appointment.action';

export const appointmentReducer = createReducer(
  initialState,
  on(addAppointment, (state, { appointment }) => {
    if (state.appointmentBooked.length < 15) {
      return {
        ...state,
        appointmentBooked: [...state.appointmentBooked, appointment],
      };
    }
    return state;
  }),

  // on(deleteAppointment, (state, { id }) => ({
  //   ...state,
  //   appointmentBooked: state.appointmentBooked.filter(appointment => appointment.id !== id),
  //   waitingRoom: state.waitingRoom.filter(appointment => appointment.id !== id),
  //   opd: state.opd.filter(appointment => appointment.id !== id)
  // })),

  on(moveToWaitingRoom, (state, { id }) => {
    const appointment = state.appointmentBooked.find(
      (appointment) => appointment.id === id
    );
    if (appointment && state.waitingRoom.length < 5) {
      return {
        ...state,
        appointmentBooked: state.appointmentBooked.filter(
          (appointment) => appointment.id !== id
        ),
        waitingRoom: [...state.waitingRoom, appointment],
      };
    }
    return state;
  }),

  // on(moveToAppointmentBooked, (state, { id }) => {
  //   const appointment = state.waitingRoom.find(appointment => appointment.id === id);
  //   if (appointment && state.appointmentBooked.length < 15) {
  //     return {
  //       ...state,
  //       waitingRoom: state.waitingRoom.filter(appointment => appointment.id !== id),
  //       appointmentBooked: [...state.appointmentBooked, appointment]
  //     };
  //   }
  //   return state;
  // }),

  on(moveToOPD, (state, { id }) => {
    const appointment = state.waitingRoom.find(
      (appointment) => appointment.id === id
    );
    if (appointment && state.opd.length < 2) {
      return {
        ...state,
        waitingRoom: state.waitingRoom.filter(
          (appointment) => appointment.id !== id
        ),
        opd: [...state.opd, appointment],
      };
    }
    return state;
  }),
  on(removeFromOPD, (state, { id }) => ({
    ...state,
    opd: state.opd.filter((appointment) => appointment.id !== id),
  }))
);
