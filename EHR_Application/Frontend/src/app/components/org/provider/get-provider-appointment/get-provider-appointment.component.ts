import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../../../others/services/appointment/appointment.service';
declare var bootstrap: any;

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
  userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  appointmentService = inject(AppointmentService);
  toaster = inject(ToastrService);

  ngOnInit(): void {
      this.getAllAppointments();
  }

  getAllAppointments(){
    this.appointmentService.getProviderAppointment(Number(this.userData.userId)).subscribe((res:any)=>{
      this.appointments = res.data;
    })
  }

  openModal(appointment: any): void {
    this.selectedAppointment = appointment;
    console.log(this.selectedAppointment);
    const modal = new bootstrap.Modal(document.getElementById('appointmentDetailModal') as HTMLElement);
    modal.show();
  }

  deleteAppointment(id: number): void {}
}
