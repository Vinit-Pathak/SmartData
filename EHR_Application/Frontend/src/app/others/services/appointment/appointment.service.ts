import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  http = inject(HttpClient);

  getAllSpecializations(): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Appointment/getAllSpecialisation`)
  }

  getProvidersBySpecialization(specialisationId: number): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Appointment/getProviderBySpecialisation/${specialisationId}`)
  }

  getAllProviders(): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Appointment/getAllProviders`)
  }

  getPatientAppointment(userId: number): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Appointment/getPatientAppointment/${userId}`)
  }

  createPatientAppointment(appointment: any): Observable<any> {
    return this.http.post(`https://localhost:7053/api/Appointment/patientAppointment`, appointment)
  }

  cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.delete(`https://localhost:7053/api/Appointment/cancelPatientAppointment/${appointmentId}`)
  }

  updatePatientAppointment(appointment: any): Observable<any> {
    return this.http.put(`https://localhost:7053/api/Appointment/updatePatientAppointment`, appointment)
  }

  // Provider Appointment Services

  getProviderAppointment(userId:number): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Appointment/getProviderAppointment/${userId}`)
  }

  createProviderAppointment(appointment: any): Observable<any> {
    return this.http.post(`https://localhost:7053/api/Appointment/providerAppointment`, appointment)
  }

  getAllPatients(): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Appointment/getAllPatients`)
  }

  addSoapNotes(data:any): Observable<any> {
    return this.http.post(`https://localhost:7053/api/Appointment/addSoapNotes`, data)
  }

  getSoapNote(appointmentId: number): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Appointment/soapDetails/${appointmentId}`)
  }
}
