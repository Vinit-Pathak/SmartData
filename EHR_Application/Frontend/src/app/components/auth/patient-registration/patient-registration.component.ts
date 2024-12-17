import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../others/services/auth/auth.service';
import { LoaderService } from '../../../others/services/loader/loader.service';
import { CountryStateService } from '../../../others/services/countryState/country-state.service';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.css'
})
export class PatientRegistrationComponent implements OnInit {

  registerData:any;
  todayDate=new Date().toISOString().split('T')[0];

  router = inject(Router);
  toaster = inject(ToastrService);
  authService = inject(AuthService);
  loaderService = inject(LoaderService)
  countryStateService = inject(CountryStateService)


  patientRegistrationForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*\s*$/)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*\s*$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(30)
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ]),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    bloodGroup: new FormControl('', Validators.required),
    file: new FormControl<File | null>(null, Validators.required),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150),
      Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    pinCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{6}$/),
      Validators.minLength(6),
      Validators.maxLength(6)
    ]),
    userTypeId: new FormControl(1, Validators.required),
  });
  
  ngOnInit() {
    this.getAllCountry();
  }

  onKeyPress(event: KeyboardEvent) {  
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); 
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.patientRegistrationForm.patchValue({ file });
    this.patientRegistrationForm.get('file')?.updateValueAndValidity();
  }


  allCountry : any [] = []
  getAllCountry(){
    this.countryStateService.getAllCountry().subscribe({
      next : (res: any) => {
        this.allCountry = res
        
      },
      error : (error: any) =>{
        alert("I am in error")
      }
      
    })
  }

  allState : any [] = []

  allStateByCountryId: any[] = []

  loadState(countryId: number){
    this.countryStateService.getStateByCountryId(countryId).subscribe((data: any)=>{
          this.allState = data;
        });
  }

  onChange(countrId : any){
    this.countryStateService.getStateByCountryId(countrId).subscribe({
      next : (res:any) => {
        this.allStateByCountryId = res
      },
      error : (error: any) => {
        console.log("I am in error")
      }
    })
  }

  onRegisterSubmit(){
    if (this.patientRegistrationForm.invalid) {
      this.toaster.error("Please Fill And Correct All The fields", "Error");
      this.patientRegistrationForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.keys(this.patientRegistrationForm.controls).forEach(field => {
      const value = this.patientRegistrationForm.get(field)?.value;
      formData.append(field, value);
    });

    this.loaderService.show();
    this.authService.register(formData).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.toaster.success('Patient Registered Successfully', 'Success', {
            timeOut: 3000,
            closeButton: true,
          });
          this.loaderService.hide();
          this.patientRegistrationForm.reset();
          this.router.navigate(['/auth/login']);
        } else {
          this.loaderService.hide();
          this.toaster.error('Patient Registration Failed', 'Error', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      },
      error: (error: any) => {
        if(error.error.statusCode == 409){
          this.toaster.error("Patient Already Exist", "Error",{timeOut:3000, closeButton:true})
          this.patientRegistrationForm.reset()
        }else{
          this.toaster.error("Error In Registation", "Error",{timeOut:3000, closeButton:true})
          console.log(error);
        }
      },
    });
  }
}
