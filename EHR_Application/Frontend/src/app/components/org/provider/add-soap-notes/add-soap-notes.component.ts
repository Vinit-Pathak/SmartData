import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../../others/services/appointment/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../others/services/user/user.service';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-add-soap-notes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-soap-notes.component.html',
  styleUrl: './add-soap-notes.component.css'
})
export class AddSoapNotesComponent implements OnInit {

  appointmentId: any;
  allAppointment : any[] = [];
  appointment:any
  userData:any;
  providerData = JSON.parse(sessionStorage.getItem('userData') || '{}');
  route = inject(ActivatedRoute)
  router =inject(Router)
  appointmentService = inject(AppointmentService)
  toaster = inject(ToastrService)
  userService = inject(UserService)

  @ViewChild('soapNotesModal') soapNotesModal!: ElementRef;

  ngOnInit(): void {
    this.getAllAppointments(this.providerData.userId);  
    
  }

  getAllAppointments(providerId:any){
    this.appointmentService.getProviderAppointment(providerId).subscribe({
      next: (res:any)=>{
        this.allAppointment = res.data;
        this.appointmentId = this.route.snapshot.paramMap.get('appointmentId')!;
        console.log(this.appointmentId);
        
        this.appointment = this.allAppointment.filter((appointment:any)=>appointment.appointmentId == this.appointmentId)[0]
        this.getUserDetails();
      },
      error: (err:any)=>{
        this.toaster.error(err.error.message)
        console.log(err);
        
      }
    })

  }

  getUserDetails(){
    this.userService.getUserDetailsByAppointmentId(this.appointmentId).subscribe({
      next: (res:any)=>{
        this.userData = res.data[0];
      },
      error: (err:any)=>{
        this.toaster.error(err.error.message)
        console.log(err);
        
      }
    })
  }

  soapForm = new FormGroup({
    appointmentId: new FormControl(''),
    subjective: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300),Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/)]),
    objective: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300),Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/)]),
    assessment: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300),Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/)]),
    plan: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300),Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/)]),
  });

  openModal(): void {
    const modalElement = document.getElementById('soapNotesModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  closeModal(): void {
    const modalElement = document.getElementById('soapNotesModal');
    const modal = bootstrap.Modal.getInstance(modalElement); 
    modal.hide();
  }

  submitSoapNotes(){
    if(this.soapForm.invalid){
      this.toaster.error("Please fill all the fields");
      this.soapForm.markAllAsTouched();
      return;
    }
    this.closeModal();
    var soapData = this.soapForm.value;
    soapData.appointmentId = this.appointmentId;
    this.appointmentService.addSoapNotes(soapData).subscribe({
      next:(res:any)=>{
        
        this.toaster.success("Soap Notes Added Successfully", "Success", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this.router.navigateByUrl('/home/provider-dashboard/get-provider-appointments'); 
      },
      error:(err:any)=>{
        this.toaster.error(err.error.message);
        console.log(err);
      }
    })
  }
}
