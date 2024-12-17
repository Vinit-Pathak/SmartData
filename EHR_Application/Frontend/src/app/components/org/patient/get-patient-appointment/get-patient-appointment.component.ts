import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../../../../others/services/appointment/appointment.service';
declare var bootstrap: any;
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

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
  toaster = inject(ToastrService);

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

  cancelAppointment(appointment: any): void {
    this.appointmentService.cancelPatientAppointment(appointment.appointmentId).subscribe((res: any) => {
      this.getAllAppointmentsByPatientId();
    });
  }


  deleteAppointment(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to caneled this appointment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, canceled it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with the deletion if confirmed
        this.appointmentService.cancelPatientAppointment(id).subscribe(
          (response) => {
            console.log('login response', response);
            if (response.status == 200) {
              this.toaster.success('Appointment Cancelled Successfully', 'Success',{
                timeOut: 2000,
                closeButton: true,
              });
              this.getAllAppointmentsByPatientId();
            } else {
              this.toaster.error('Error cancelling appointment', 'Error',{
                timeOut: 2000,
                closeButton: true,
              });
            }
          },
          (error) => {
            this.toaster.error('Unable to get response');
          }
        );
      } else {
        // If the user cancels, do nothing
        console.log('Appointment deletion canceled');
      }
    });
  }

}
