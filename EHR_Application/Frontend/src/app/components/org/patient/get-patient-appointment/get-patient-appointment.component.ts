import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../../../../others/services/appointment/appointment.service';
declare var bootstrap: any;

@Component({
  selector: 'app-get-patient-appointment',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './get-patient-appointment.component.html',
  styleUrl: './get-patient-appointment.component.css'
})
export class GetPatientAppointmentComponent implements OnInit {

  appointments: any[] = [];
  selectedAppointment: any = {};
  userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  appointmentService = inject(AppointmentService);

  ngOnInit(): void {
    this.getAllAppointmentsByPatientId();
  }


  getAllAppointmentsByPatientId() {
    this.appointmentService.getPatientAppointment(Number(this.userData.userId)).subscribe((res: any) => {
      this.appointments = res.data;
      
    });
  }

  openModal(appointment: any): void {
    this.selectedAppointment = appointment;
    console.log(this.selectedAppointment);
    const modal = new bootstrap.Modal(document.getElementById('appointmentDetailModal') as HTMLElement);
    modal.show();
  }



}
