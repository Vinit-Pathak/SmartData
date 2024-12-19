import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../../../others/services/appointment/appointment.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-patient-past-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './patient-past-appointment.component.html',
  styleUrl: './patient-past-appointment.component.css'
})
export class PatientPastAppointmentComponent {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
  selectedAppointment: any = {};
  soapNotesData: any;
  appointmentService = inject(AppointmentService);  

  appointmentStatusForm = new FormGroup({
    appointmentStatus: new FormControl('') 
  });

  ngOnInit(): void {
    this.getAllAppointments();
  }

  
  getAllAppointments() {
    this.appointmentService.getPatientAppointment(Number(this.userData.userId)).subscribe({
      next: (res: any) => {
        this.appointments = res.data;
        this.filteredAppointments = this.appointments.filter((appointment: any) => appointment.appointmentStatus === "Cancelled" || appointment.appointmentStatus === "Completed");
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  
  appointmentStatusFiltered(appointmentStatus: any){
  
    if (appointmentStatus === '') {
      this.filteredAppointments = this.appointments.filter((appointment: any) => appointment.appointmentStatus === "Cancelled" || appointment.appointmentStatus === "Completed");
    } else {
      this.filteredAppointments = this.appointments.filter((appointment: any) => appointment.appointmentStatus === appointmentStatus);
    }
  }

  viewSoapNote(appointmentId: any) {
    this.appointmentService.getSoapNote(appointmentId).subscribe({
      next: (res: any) => {
        this.soapNotesData = res.data;
  
        const modalElement = document.getElementById('soapNoteModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: (error: any) => {
        console.error('Error fetching SOAP note:', error);
      },
    });
  }
}
