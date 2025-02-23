import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../../../others/services/appointment/appointment.service';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../../others/services/payment/payment.service';
import { LoaderService } from '../../../../others/services/loader/loader.service';
declare var bootstrap: any;

@Component({
  selector: 'app-add-patient-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-patient-appointment.component.html',
  styleUrl: './add-patient-appointment.component.css',
})
export class AddPatientAppointmentComponent {

  router = inject(Router);
  toastr = inject(ToastrService);
  Appointmentservice = inject(AppointmentService);
  paymentService = inject(PaymentService);
  loader = inject(LoaderService);
  todayDate = new Date().toISOString().split('T')[0];
  allSpecialisation: any[] = [];
  allProviders: any[] = [];
  isTimeValid = true; 
  isTimeInRange = true; 

  patientdata: any = {};
  userdata = JSON.parse(sessionStorage.getItem('userData') || '{}');
  minDate = new Date();
  minTime!: string;
  appointmentTime: Date;
  Fees!: any;

  constructor(private fb: FormBuilder) {
    this.minTime = this.calculateMinTime();


    this.appointmentTime = new Date();
    this.appointmentTime.setHours(this.appointmentTime.getHours() + 1);
    this.appointmentTime.setMinutes(0);
    this.appointmentTime.setSeconds(0);
  }


  openWaitingModal(): void {
    const modalElement = document.getElementById('waitingModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  closeWaitingModal(): void {
    const modalElement = document.getElementById('waitingModal');
    const modal = bootstrap.Modal.getInstance(modalElement); 
    modal.hide();
  }

  patientappoinmentform = new FormGroup({
      appointmentDate: new FormControl('', [Validators.required]),
      providerId: new FormControl('', Validators.required),
      patientId: new FormControl(this.userdata.userId, Validators.required),
      specializationId: new FormControl('', [Validators.required]),
      appointmentTime: new FormControl('', [Validators.required]),
      chiefcomplaint: new FormControl('', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(150),
      Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/)
      ]),
  });

  ngOnInit(): void {

    this.getAllSpecializations();

  }

  calculateMinTime(): string {
    const now = new Date();
    const hour = now.getHours() + 1;
    const minute = now.getMinutes();
    return `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  }


  getAllSpecializations(){
    this.Appointmentservice.getAllSpecializations().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.allSpecialisation = res.data;
        }
      },
      error: (error) => {
        console.error(error);
      },
    })
  }

  onChange(specialisationId:any){
    this.Appointmentservice.getProvidersBySpecialization(specialisationId).subscribe({
      next:(res:any)=>{
        this.allProviders = res.data;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  onChangeProvider(providerId:any){
    this.allProviders.map((provider:any)=>{
      if(provider.userId == providerId){
        this.Fees = provider.visitingCharge;
      }
    })
  }


  onPayNow(){
    if(this.patientappoinmentform.invalid){
      this.toastr.error('Please fill all the required fields', 'Error',{
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
      });
      this.patientappoinmentform.markAllAsTouched();
      return;
    }
    this.paymentService.createOrder(this.Fees).subscribe((order:any)=>{

      const options = {
        key: 'rzp_test_j1n3HfglIVc3GS',  
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: (response: any) => {
          this.bookAppointment(response.razorpay_payment_id, order.id);
          
        },
      };

      if (window.Razorpay) {
        const razorpay = new Razorpay(options);
        razorpay.open();
      } else {
        console.error('Razorpay SDK is not loaded properly');
      }
    })
  }
  verifyPayment(paymentId: any, orderId: any){
    this.paymentService.verifyPayment(paymentId, orderId).subscribe({
      next:(res:any)=>{
        console.log(res);
        
      },
      error:(error)=>{
        console.log(error);
      }
    })
  } 

  async bookAppointment(paymentId: any, orderId: any){
    this.openWaitingModal();

    const appointmentData = this.patientappoinmentform.value;

    const data = {
      ...appointmentData,
      patientId: Number(this.userdata.userId),
      fee : this.Fees,
      paymentId: paymentId,
      orderId: orderId
    }
    this.Appointmentservice.createPatientAppointment(data).subscribe({
      next:(res:any)=>{
        this.closeWaitingModal();
        this.toastr.success('Appointment Booked Successfully','Success',{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this.router.navigateByUrl('/home/patient-dashboard/get-patient-appointments')
      },
      error:(error)=>{
        this.toastr.error('Something went wrong');
        console.log(error);
        
      }
    })
  }



  onChangeTime(event: Event): void {
    const selectedTime = (event.target as HTMLInputElement).value;
    const currentTime = new Date();
    
    
    const minAllowedTime = new Date(currentTime.getTime() + 60 * 60 * 1000); 
    const formattedMinTime = this.formatTime(minAllowedTime);
    
    
    const maxTime = '20:00';
    
    const minTime = '08:00';
  
    
    if (selectedTime < minTime || selectedTime > maxTime) {
      this.isTimeInRange = false;
    } else {
      this.isTimeInRange = true;
    }
  
    
    if (selectedTime < formattedMinTime) {
      this.isTimeValid = false;
      console.log("Time must be at least 1 hour later than the current time.");
    } else {
      this.isTimeValid = true;
      console.log("Time is valid.");
    }
  }
  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  
  onChangeDate(): void {
    const time = this.patientappoinmentform.get('appointmentTime')?.value;
    if (time) {
      const date = this.patientappoinmentform.get('appointmentDate')?.value;
      
      const selectedDate = date ? new Date(date) : new Date();
      const today = new Date();
  
      
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
  
      if (selectedDate.getTime() === today.getTime()) {
        const selectedTime = time;
  
        
        const now = new Date();
        now.setHours(now.getHours() + 1);
        const nextHour = now.getHours().toString().padStart(2, '0');
        const nextMinutes = now.getMinutes().toString().padStart(2, '0');
        const nextTime = `${nextHour}:${nextMinutes}`;
  
        
        const selectedDateTime = new Date(`${today.toDateString()} ${selectedTime}`);
        const nextDateTime = new Date(`${today.toDateString()} ${nextTime}`);
  
        
        if (selectedDateTime < nextDateTime) {
          this.isTimeValid = false;
          console.log("Selected time is less than the next hour time");
        } else {
          this.isTimeValid = true;
          console.log("Selected time is valid");
        }
      }
    }
  }


}
