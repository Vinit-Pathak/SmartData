import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../others/services/auth/auth.service';
import { LoaderService } from '../../../others/services/loader/loader.service';
import { CountryStateService } from '../../../others/services/countryState/country-state.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../others/services/user/user.service';

@Component({
  selector: 'app-provider-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './provider-registration.component.html',
  styleUrl: './provider-registration.component.css',
})
export class ProviderRegistrationComponent {
  registerData: any;
  todayDate = new Date().toISOString().split('T')[0];

  router = inject(Router);
  toaster = inject(ToastrService);
  authService = inject(AuthService);
  userService = inject(UserService)
  loaderService = inject(LoaderService);
  countryStateService = inject(CountryStateService);

  providerRegistrationForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*\s*$/),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*\s*$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(30),
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    bloodGroup: new FormControl('', Validators.required),
    file: new FormControl<File | null>(null, Validators.required),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150),
      Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    pinCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{6}$/),
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    userTypeId: new FormControl(2, Validators.required),
    qualification: new FormControl('', 
    [Validators.required,
     Validators.minLength(3),
     Validators.maxLength(20),
     Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/),
    ]),
    specializationId: new FormControl('', Validators.required),
    registrationNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/),
    ]),
    visitingCharge: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(6),
      Validators.pattern(/^\d{1,6}$/),]),
  });


  ngOnInit() {
    this.getAllCountry();
    this.getAllSpecialisation();
    this.sanitizeField('firstName');
    this.sanitizeField('lastName');
    this.sanitizeField('city');
    this.sanitizeField('qualification');
  }

  onKeyPress(event: KeyboardEvent) {  
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); 
    }
  }

  sanitizeField(fieldName: string): void {
    this.providerRegistrationForm.get(fieldName)?.valueChanges.subscribe((value) => {
      if (value) {
        
        const sanitizedValue = value
          .replace(/[^A-Za-z\s]/g, '') 
          .replace(/\s{2,}/g, ' '); 
        if (value !== sanitizedValue) {
          this.providerRegistrationForm.get(fieldName)?.setValue(sanitizedValue, {
            emitEvent: false, 
          });
        }
      }
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.providerRegistrationForm.patchValue({ file });
    this.providerRegistrationForm.get('file')?.updateValueAndValidity();
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

  allSpecialisation : any [] = []
  getAllSpecialisation(){
    this.userService.getAllSpecialisation().subscribe({
      next : (res: any) => {
        this.allSpecialisation = res.data
      },
      error : (error: any) => {
        console.log("I am in error")
      }
    })
  }

  onRegisterSubmit(){
    if (this.providerRegistrationForm.invalid) {
      this.toaster.error("Please Fill And Correct All The fields", "Error",{
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
      });
      this.providerRegistrationForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.keys(this.providerRegistrationForm.controls).forEach(field => {
      const value = this.providerRegistrationForm.get(field)?.value;
      formData.append(field, value);
    });

    this.authService.register(formData).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.toaster.success('Provider Registered Successfully', 'Success', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.loaderService.hide();
          this.providerRegistrationForm.reset();
          this.router.navigate(['/auth/login']);
        } else {
          this.loaderService.hide();
          this.toaster.error('Provider Registration Failed', 'Error', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      },
      error: (error: any) => {
        if(error.error.statusCode == 409){
          this.toaster.error("Provider Already Exist", "Error",{timeOut:3000, closeButton:true})
          this.providerRegistrationForm.reset()
        }else{
          this.toaster.error("Error In Registation", "Error",{timeOut:3000, closeButton:true})
          console.log(error);
        }
      },
    });
  }
}
