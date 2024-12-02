import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../service/user/user-service.service';
import { UtilsService } from '../../service/utils/session';

@Component({
  selector: 'app-register-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-login.component.html',
  styleUrl: './register-login.component.css'
})
export class RegisterLoginComponent {
  isLogin: boolean = true;
  password: string = '';
  confirmPassword: string = '';
  loginData: any;
  registerData: any;

  router = inject(Router);
  toaster = inject(ToastrService);
  session = inject(UtilsService);
  userService = inject(UserServiceService);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    otp: new FormControl('', Validators.required)
  });

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  otpSent: boolean = false;
  countdown: number = 0; 
  countdownInterval: any;

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  onLoginSubmit() {
    this.loginData = this.loginForm.value;
    this.userService.login(this.loginData).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", this.loginData.email);
          
          const expiry = new Date(res.data.expiration);
          localStorage.setItem('expiry', expiry.toISOString());
          
          this.toaster.success("Login successful", "Success", { timeOut: 3000, closeButton: true });
          localStorage.setItem("session", "true");
          this.router.navigateByUrl('video');
        } else {
          this.toaster.error("Server Error Occurred", "Error", { timeOut: 3000, closeButton: true });
        }
      },
      error: (error: any) => {
        if (error.error.statusCode == 401) {
          this.toaster.error("Invalid Credentials", "Error", { timeOut: 3000, closeButton: true });
        } else {
          this.toaster.error("An unexpected error occurred.", "Error", { timeOut: 3000, closeButton: true });
        }
      }
    });
  }

  onRegisterSubmit() {
    this.registerData = this.registerForm.value;
    delete this.registerData.confirmPassword;
    this.userService.register(this.registerData).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success("User Registered Successfully", "Success", { timeOut: 3000, closeButton: true });
          this.isLogin = true;
          this.router.navigateByUrl('/');
        } else {
          this.toaster.error("User Registration Failed", "Error", { timeOut: 3000, closeButton: true });
        }
      },
      error: (error: any) => {
        if (error.error.statusCode == 409) {
          this.toaster.error("User Already Exists", "Error", { timeOut: 3000, closeButton: true });
        } else {
          this.toaster.error("An unexpected error occurred.", "Error", { timeOut: 3000, closeButton: true });
        }
      }
    });
  }

  sendOtp() {
    if (this.countdown > 0) {
      return; 
    }
    
    
    const email = this.loginForm.get('email')?.value;
    this.userService.sendOtp(email).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.toaster.success("OTP Sent Successfully", "Success", { timeOut: 3000, closeButton: true });
          this.otpSent = true; 
          this.countdown = 20;
          this.startCountdown();
        } else {
          this.toaster.error("OTP Not Sent", "Error", { timeOut: 3000, closeButton: true });
        }
      },
      error: (error: any) => {
        this.toaster.error("An error occurred while sending OTP", "Error", { timeOut: 3000, closeButton: true });
      }
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
