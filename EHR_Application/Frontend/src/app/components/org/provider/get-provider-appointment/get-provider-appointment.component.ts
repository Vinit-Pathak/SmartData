import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../../../others/services/appointment/appointment.service';
declare var bootstrap: any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get-provider-appointment',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './get-provider-appointment.component.html',
  styleUrl: './get-provider-appointment.component.css'
})
export class GetProviderAppointmentComponent implements OnInit {

  appointments: any[] = [];
  selectedAppointment: any = {};
  filterAppointments: any[] = [];
  userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  appointmentService = inject(AppointmentService);
  toaster = inject(ToastrService);

  ngOnInit(): void {
      this.getAllAppointments();
  }

  getAllAppointments(){
    this.appointmentService.getProviderAppointment(Number(this.userData.userId)).subscribe({
      next:(res:any)=>{
        this.appointments = res.data;
        this.filterAppointments = this.appointments.filter((appointment: any) => appointment.appointmentStatus === "Scheduled");
      }
    })
  }

  cancelAppointment(id: number): void {
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
          this.appointmentService.cancelAppointment(id).subscribe(
            (response) => {
              if (response.statusCode == 200) {
                this.toaster.success('Appointment Cancelled Successfully', 'Success',{
                  timeOut: 2000,
                  progressBar: true,
                  progressAnimation: 'increasing',
                });
                this.getAllAppointments();
              } else {
                this.toaster.error('Error cancelling appointment', 'Error',{
                  timeOut: 2000,
                  progressBar: true,
                  progressAnimation: 'increasing',
                });
              }
            },
            (error) => {
              this.toaster.error('Unable to get response');
            }
          );
        }  else if (result.dismiss === Swal.DismissReason.cancel) {
          // Swal.fire('Cancelled', 'Your item is safe.', 'info');
        }
      });
    }
  
}
