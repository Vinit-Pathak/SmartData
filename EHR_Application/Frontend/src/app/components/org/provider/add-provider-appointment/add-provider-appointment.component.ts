import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../../../others/services/appointment/appointment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-provider-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-provider-appointment.component.html',
  styleUrl: './add-provider-appointment.component.css'
})
export class AddProviderAppointmentComponent implements OnInit {
  
  patients: any[] = [];
  userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  appointmentService = inject(AppointmentService);
  toaster = inject(ToastrService);
  router = inject(Router)
  
  appointmentForm = new FormGroup({
    patientId : new FormControl('', Validators.required),
    appointmentDate : new FormControl('', Validators.required),
    appointmentTime : new FormControl('', Validators.required),
    chiefComplaint : new FormControl('', Validators.required),
  })
  
  
  ngOnInit(): void {
    this.appointmentService.getAllPatients().subscribe({
      next : (res:any)=>{
        this.patients = res;
      }
    })
  }

  onSubmit(){
    if(this.appointmentForm.invalid){
      this.appointmentForm.markAllAsTouched();
      return;
    }

    const formValue = this.appointmentForm.value;
    const providerId = this.userData.userId;

    const request = {
      ...formValue,
      providerId
    }

    this.appointmentService.createProviderAppointment(request).subscribe({
      next : (res:any)=>{
        this.toaster.success(res.message);
        this.router.navigate(['/home/provider-dashboard/get-provider-appointments']);
      },
      error : (err:any)=>{
        this.toaster.error(err.error.message);
      }
    })
  }
}
