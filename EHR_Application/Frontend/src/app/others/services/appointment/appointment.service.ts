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
}
