export interface Appointment {
    id: number;
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
  }
  
  export interface AppointmentState {
    waitingRoom: Appointment[];
    appointmentBooked: Appointment[];
    opd: Appointment[];
  }
  
  export const initialState: AppointmentState = {
    waitingRoom: [],
    appointmentBooked: [],
    opd: []
  };