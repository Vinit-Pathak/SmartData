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

  allSpecialisation: any[] = [];
  allProviders: any[] = [];

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

  patientappoinmentform = new FormGroup({
    appointmentDate: new FormControl('', [Validators.required]),
      providerId: new FormControl('', Validators.required),
      patientId: new FormControl(this.userdata.userId, Validators.required),
      specializationId: new FormControl('', [Validators.required]),
      appointmentTime: new FormControl('', [Validators.required]),
      chiefcomplaint: new FormControl('', [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150),
      Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/),
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

  openModal() {
    if(this.patientappoinmentform.invalid){
      this.patientappoinmentform.markAllAsTouched();
    } else{

      const modal = document.getElementById('myModal');
      if (modal) {
        modal.style.display = 'block';
      }
    }
  }

  CloseModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Pay()
  // {
  //   const amount: number = (this.Fees);
  //   this.onPayNow(Math.floor(amount));
  // }

  // onPayNow(amount: number) {
  //   debugger;

  //   this.paymentService.createOrder(amount).subscribe((order:any) => {
  //     console.log('API request sent' , amount);
  //     console.log(order)
  //     const options: any = {
  //       key:'rzp_test_KMY5pBLSVhJH3u', // Replace with your Razorpay Key ID
  //       amount: amount * 100, // Amount in paise
  //       currency: 'INR',
  //       name: 'SDN Company',
  //       description: 'Payment for Order',
  //       order_id: order.orderId,
  //       handler: (response: any) => {
  //         // this.verifyPayment(response);
  //       },
  //       prefill: {
  //         name: 'Customer Name',
  //         email: 'customer@example.com',
  //       },
  //       theme: {
  //         color: '#F37254'
  //       }
  //     };

  //     const rzp1 :any = new Razorpay(options);
  //     rzp1.open();
  //   });
  //   this.onSubmit();
  // }

  onSubmit() {
    if (this.patientappoinmentform.invalid) {
      return;
    }

    const formValues = this.patientappoinmentform.value;
    formValues.appointmentTime = this.appointmentTime.toISOString();
    this.Appointmentservice.createPatientAppointment(formValues).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          console.log(res);
          this.patientdata = res.data;
          this.toastr.success('Appoinment Booked Successfully');
          // this.router.navigate(['/patient']);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
