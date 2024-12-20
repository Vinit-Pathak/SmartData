import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../../../../others/services/appointment/appointment.service';
declare var bootstrap: any;
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-patient-appointment',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './get-patient-appointment.component.html',
  styleUrl: './get-patient-appointment.component.css'
})
export class GetPatientAppointmentComponent implements OnInit {

  appointments: any[] = [];
  selectedAppointment: any = {};
  userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
  todayDate = new Date().toISOString().split('T')[0];
  isUpdating : boolean = false;
  filterAppointments: any[] = [];
  appointmentService = inject(AppointmentService);
  toaster = inject(ToastrService);
  minTime: any;

  @ViewChild('updateAppointmentModal') updateAppointmentModal!: ElementRef;

  ngOnInit(): void {
    this.getAllAppointmentsByPatientId();
  }


  getAllAppointmentsByPatientId() {
    this.appointmentService.getPatientAppointment(Number(this.userData.userId)).subscribe((res: any) => {
      this.appointments = res.data;
      this.filterAppointments = this.appointments.filter((appointment: any) => appointment.appointmentStatus === "Scheduled");
      console.log(this.appointments);
      
    });
  }

  openModal(appointment: any): void {
    this.selectedAppointment = appointment;
    console.log(this.selectedAppointment);
    const modal = new bootstrap.Modal(document.getElementById('appointmentDetailModal') as HTMLElement);
    modal.show();
  }



  updateAppointmentForm = new FormGroup({
    appointmentId: new FormControl(0),
    appointmentDate: new FormControl('',[Validators.required]),
    appointmentTime: new FormControl('',[Validators.required]),
    chiefComplaint: new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(150)]),
  })


  openUpdateModal(appointment:any): void {
    const modalElement = document.getElementById('appointmentModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement); 
    modal.show(); 
    appointment.appointmentDate = new DatePipe('en-US').transform(appointment.appointmentDate, 'yyyy-MM-dd');
    this.updateAppointmentForm.patchValue(appointment);
  }

  closeUpdateModal(): void {
    const modalElement = document.getElementById('appointmentModal') as HTMLElement;
    const modal = bootstrap.Modal.getInstance(modalElement); 
    modal.hide(); 
    this.updateAppointmentForm.reset();
  }

  onUpdateAppointment(){
    if(this.updateAppointmentForm.invalid){
      this.toaster.error('Please fill all the fields', 'Error', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
      });
      return;
    }

    const appointment = this.updateAppointmentForm.value;
    this.appointmentService.updatePatientAppointment(appointment).subscribe({
      next:(res:any)=>{
        if(res.statusCode == 200){
          this.toaster.success('Appointment Updated Successfully', 'Success', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          window.location.reload();
         this.closeUpdateModal()
        }else{
          this.toaster.error('Error updating appointment', 'Error', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }
      },
      error:(error)=>{
        this.toaster.error('Unable to get response');
        console.log(error);
      }
    })

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
        this.appointmentService.cancelAppointment(id).subscribe(
          (response) => {
            console.log('login response', response);
            if (response.statusCode == 200) {
              this.toaster.success('Appointment Cancelled Successfully', 'Success',{
                timeOut: 2000,
                closeButton: true,
              });
              window.location.reload();
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
        console.log('Appointment deletion canceled');
      }
    });
  }


}
