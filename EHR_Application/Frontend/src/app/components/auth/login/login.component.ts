import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../others/services/loader/loader.service';
import { AuthService } from '../../../others/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  passwordRgx: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
  otpSent = false;
  showPassword = false;
  countdown:number = 0;
  countdownInterval: any;
  loginData: any;

  router = inject(Router);
  toaster = inject(ToastrService);
  loaderService = inject(LoaderService)
  authService = inject(AuthService)


  ngOnInit() {
    this.sanitizeFieldForOTP('otp');
  }


  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRgx)
    ]),    
    otp: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
  });

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })



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

  

  onLoginSubmit(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toaster.warning('Please fill in all required fields.', 'Warning', {
        timeOut: 3000,
        closeButton: true,
      });
      return;
    }

    this.loginData = this.loginForm.value;
    this.authService.login(this.loginData).subscribe({
      next: (res:any)=>{
        if(res.statusCode === 200 && res.isSuccess){
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('userData', JSON.stringify(res.data.data));
          localStorage.setItem('role', res.data.data.userTypeId);

          const expiry = new Date(res.data.expiration);
          localStorage.setItem('expiry', expiry.toISOString());
  
          this.toaster.success('Login successful', 'Success', {
            timeOut: 2000,
            closeButton: true,
          });

          if(res.data.data.userTypeId ===1){
            this.router.navigateByUrl('patient-dashboard');
          }else if(res.data.data.userTypeId ===2){
            this.router.navigateByUrl('provider-dashboard');
          }else{
            this.toaster.error('Unexpected role', 'Error', {
              timeOut: 2000,
              closeButton: true,
            });
          }
        }else{
          this.toaster.error(res.message || 'Unexpected error', 'Error', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      },
      error: (error)=>{
        if(error.status === 401){
          this.toaster.error('Invalid credentials', 'Error', {
            timeOut: 2000,
            closeButton: true,
          });
        }else{
          this.toaster.error('An unexpected error occurred.', 'Error', {
            timeOut: 2000,
            closeButton: true,
          });
        }
      }
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  openForgotPassword(){
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

  onForgotPasswordSubmit(){
    if (this.forgotPasswordForm.invalid) {
      this.toaster.warning('Please enter a valid email address.', 'Warning', {
        timeOut: 3000,
        closeButton: true,
      });
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

    this.authService.forgotPassword(email).subscribe({
      next: (res: any) => {
        this.toaster.success('New Password sent to your email successfully', 'Password Reset');
        this.closeForgotPassword();
      },
      error: (error: any) => {
        this.toaster.error(
          error.error.message || 'An unexpected error occurred.',
          'Error',
          {
            timeOut: 3000,
            closeButton: true,
          }
        );
      },
    })
  }

  sendOtp(){
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
    this.authService.sendOtp(userName, password).subscribe({
      next: (res: any) => {
        if(res.statusCode === 200){
          this.toaster.success('OTP Sent Successfully', 'Success', {
            timeOut: 2000,
            closeButton: true,
          });
          this.otpSent = true;
          this.countdown = 20;
          this.startCountdown();
        }else{
          this.toaster.error('OTP Not Sent', 'Error', {
            timeOut: 2000,
            closeButton: true,
          });
        }
      },
      error: (error:any) => {
        this.toaster.error(
          error.error.message || 'Username & Password is invalid',
          'Error',
          {
            timeOut: 3000,
            closeButton: true,
          }
        );
      },
    })
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
