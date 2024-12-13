import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserType } from '../../models/user-type.enum';
import { LoaderService } from '../../service/loader/loader.service';
import { CountryStateService } from '../../service/countryState/country-state.service';

@Component({  
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  isLogin: boolean = true;
  password: string = '';
  confirmPassword: string = '';
  loginData: any;
  registerData: any;
  showPassword: boolean = false;
  UserType = UserType;
  otpSent: boolean = false;
  countdown: number = 0;
  countdownInterval: any;
  fileSizeError = false;
  todayDate=new Date().toISOString().split('T')[0];
  passwordRgx: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/

  router = inject(Router);
  toaster = inject(ToastrService);
  userService = inject(UserService);
  loaderService = inject(LoaderService)
  countryStateService = inject(CountryStateService)




  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRgx)
    ]),    
    userType: new FormControl(UserType.Customer, Validators.required),
    otp: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
  });

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.minLength(2), Validators.maxLength(20), Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*\s*$/)] ),
    lastName: new FormControl('', [Validators.required,Validators.minLength(2), Validators.maxLength(20), Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*\s*$/)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    mobile: new FormControl('',  [Validators.required, Validators.pattern(/^\d{10}$/)]),
    dateOfBirth: new FormControl('', Validators.required),
    userType: new FormControl(UserType.Customer, Validators.required),
    file: new FormControl<File | null>(null, Validators.required),
    address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150), Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/)]),
    zipCode:  new FormControl("", [Validators.required, Validators.pattern(/^\d{6}$/), Validators.minLength(6), Validators.maxLength(6)]),
    state: new FormControl("", Validators.required),
    country: new FormControl("", Validators.required),
  });


  sanitizeField(fieldName: string): void {
    this.registerForm.get(fieldName)?.valueChanges.subscribe((value) => {
      if (value) {
        
        const sanitizedValue = value
          .replace(/[^A-Za-z\s]/g, '') 
          .replace(/\s{2,}/g, ' '); 
        if (value !== sanitizedValue) {
          this.registerForm.get(fieldName)?.setValue(sanitizedValue, {
            emitEvent: false, 
          });
        }
      }
    });
  }
  
    sanitizeFieldForOTP(fieldName: string): void {
      this.loginForm.get(fieldName)?.valueChanges.subscribe((value) => {
        if (value) {
          const sanitizedValue = value.replace(/[^0-9]/g, ''); 
          if (value !== sanitizedValue) {
            this.loginForm.get(fieldName)?.setValue(sanitizedValue, {
              emitEvent: false, 
            });
          }
        }
      });
    }

  sanitizeFieldForEmail(fieldName: string): void {
    this.registerForm.get(fieldName)?.valueChanges.subscribe((value) => {
      if (value) {
        const sanitizedValue = value
          .replace(/[^A-Za-z0-9@._-]/g, '')
          .replace(/\s{2,}/g, '') 
          .trim(); 
        if (value !== sanitizedValue) {
          this.registerForm.get(fieldName)?.setValue(sanitizedValue, {
            emitEvent: false, 
          });
        }
      }
    });
  }

  sanitizeFieldForLoginForm(fieldName: string): void {
    this.loginForm.get(fieldName)?.valueChanges.subscribe((value) => {
      if (value) {
        const sanitizedValue = value
          .replace(/[^A-Za-z0-9_\s]/g, '') 
          .replace(/\s{2,}/g, ' ') 
          .trim(); 
        if (value !== sanitizedValue) {
          this.loginForm.get(fieldName)?.setValue(sanitizedValue, {
            emitEvent: false, 
          });
        }
      }
    });
  }

  sanitizeFieldForForgetPasswordForm(fieldName: string): void {
    this.forgotPasswordForm.get(fieldName)?.valueChanges.subscribe((value) => {
      if (value) {
        const sanitizedValue = value
          .replace(/[^A-Za-z0-9_\s]/g, '') 
          .replace(/\s{2,}/g, ' ') 
          .trim(); 
        if (value !== sanitizedValue) {
          this.forgotPasswordForm.get(fieldName)?.setValue(sanitizedValue, {
            emitEvent: false, 
          });
        }
      }
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.registerForm.patchValue({ file });
    this.registerForm.get('file')?.updateValueAndValidity();
  }


  ngOnInit(): void {
    this.getAllCountry();
    this.sanitizeField('firstName');
    this.sanitizeField('lastName');
    this.sanitizeFieldForEmail('email');
    this.sanitizeFieldForOTP('otp');
    // this.sanitizeFieldForForgetPasswordForm('email')
  }

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  openForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    const overlay = document.getElementById('overlay');
  
    if (modal != null && overlay != null) {
      modal.style.display = 'block'; 
      overlay.classList.add('visible'); 
    }
  }
  
  closeForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    const overlay = document.getElementById('overlay');
  
    if (modal != null && overlay != null) {
      modal.style.display = 'none'; 
      overlay.classList.remove('visible'); 
    }
    this.forgotPasswordForm.reset();
  }
  

  onForgotPasswordSubmit() {
    this.loaderService.show();
    if (this.forgotPasswordForm.invalid) {
      this.toaster.warning('Please enter a valid email address.', 'Warning', {
        timeOut: 3000,
        closeButton: true,
      });
      this.loaderService.hide();
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    const email = this.forgotPasswordForm.get('email')?.value;
    if (!email) {
      this.toaster.warning('Email is required.', 'Warning', {
        timeOut: 3000,
        closeButton: true,
      });
      this.loaderService.hide();
      return;
    }
    this.userService.forgotPassword(email).subscribe({
      next: (res: any) => {
        this.loaderService.hide();
        this.toaster.success('Password reset link sent to your email', 'Password Reset');
        this.closeForgotPassword();
      },
      error: (error: any) => {
        this.loaderService.hide();
        const errorMessage = error.error?.message || 'An unexpected error occurred';
        this.toaster.error(errorMessage, 'Error', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    });
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toaster.warning('Please fill in all required fields.', 'Warning', {
        timeOut: 3000,
        closeButton: true,
      });
      return;
    }
  
    this.loaderService.show();
    this.loginData = this.loginForm.value;
    this.loginData.userType = parseInt(this.loginData.userType, 10);
  
    this.userService.login(this.loginData).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200 && res.data.isSuccess) {
          this.loaderService.hide();
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userData', JSON.stringify(res.data.data));
          localStorage.setItem('role', res.data.data.userType);
          localStorage.setItem('email', res.data.data.email);
          localStorage.setItem('id', res.data.id)
          const expiry = new Date(res.data.expiration);
          localStorage.setItem('expiry', expiry.toISOString());
  
          this.toaster.success('Login successful', 'Success', {
            timeOut: 3000,
            closeButton: true,
          });

          if (res.data.data.userType === 1) {
        this.router.navigateByUrl('product');
      } else if (res.data.data.userType === 2) {
        this.router.navigateByUrl('customer-dashboard');
      } else {
        this.toaster.error('Unexpected role', 'Error', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    } else {
      this.toaster.error(res.message || 'Unexpected error', 'Error', {
        timeOut: 3000,
        closeButton: true,
      });
    }
      },
      error: (error: any) => {
        if (error.status === 400 || error.status === 401) {
          this.loaderService.hide();
          this.toaster.error(error.error.message || 'Invalid Credentials', 'Error', {
            timeOut: 3000,
            closeButton: true,
          });
        } else {
          this.toaster.error('An unexpected error occurred.', 'Error', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      },
    });
  }
  

  onRegisterSubmit() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toaster.error("Please Fill And Correct All The fields", "Error");
      return;
    }

    const formData = new FormData();
    Object.keys(this.registerForm.controls).forEach(field => {
      const value = this.registerForm.get(field)?.value;
      formData.append(field, value);
    });
    
    this.userService.register(formData).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.loaderService.hide();
          this.toaster.success('User Registered Successfully', 'Success', {
            timeOut: 3000,
            closeButton: true,
          });
          this.isLogin = true;
          this.router.navigateByUrl('/');
        } else {
          this.toaster.error('User Registration Failed', 'Error', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      },
      error: (error: any) => {
        if(error.error.statusCode == 409){
          this.toaster.error("User Already Exist", "Error",{timeOut:3000, closeButton:true})
          this.registerForm.reset()
        }else{
          this.toaster.error("Error In Registation", "Error",{timeOut:3000, closeButton:true})
          console.log(error);
        }
      },
    });
  }

  onKeyPress(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); 
    }
  }

  sendOtp() {
    debugger;
    if (this.countdown > 0) {
      return;
    }
    this.loaderService.show();
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    if (!userName) {
      this.toaster.warning('Please enter a correct username to send OTP.', 'Warning', {
        timeOut: 3000,
        closeButton: true,
      });
      this.loaderService.hide();
      return;
    }

    this.userService.sendOtp(userName, password).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.loaderService.hide();
          this.toaster.success('OTP Sent Successfully', 'Success', {
            timeOut: 3000,
            closeButton: true,
          });
          this.otpSent = true;
          this.countdown = 20;
          this.startCountdown();
        } else {
          this.toaster.error('OTP Not Sent', 'Error', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      },
      error: (error: any) => {
        this.loaderService.hide();
        this.toaster.error(
          error.error.message || 'Username & Password is invalid',
          'Error',
          {
            timeOut: 3000,
            closeButton: true,
          }
        );
      },
    });
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  
}
