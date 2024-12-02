import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../service/loader/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLogin: boolean = true;
  password: string = '';
  confirmPassword: string = '';
  loginData: any;
  registerData: any;
  showPassword: boolean = false;

  router = inject(Router);
  toaster = inject(ToastrService);
  authService = inject(AuthService);
  loaderService = inject(LoaderService)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', Validators.required),
    otp: new FormControl('', Validators.required)
  });

  registerForm = new FormGroup({
    id:new FormControl(0),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    role: new FormControl('', Validators.required),
    isActive: new FormControl(false, Validators.required) 
  });

  otpSent: boolean = false;
  countdown: number = 0; 
  countdownInterval: any;

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLoginSubmit() {
    this.loaderService.show();
    this.loginData = this.loginForm.value;
    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.loaderService.hide();
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("email", this.loginData.email);
          sessionStorage.setItem("Name", res.data.name);
          sessionStorage.setItem("role", this.loginData.role);
          
          const expiry = new Date(res.data.expiration);
          sessionStorage.setItem('expiry', expiry.toISOString());
          
          this.toaster.success("Login successful", "Success", { timeOut: 3000, closeButton: true });
          sessionStorage.setItem("session", "true");
          this.router.navigateByUrl('profile');
        } else {
          this.toaster.error("Server Error Occurred", "Error", { timeOut: 3000, closeButton: true });
        }
      },
      error: (error: any) => {
        if (error.error.statusCode == 401) {
          this.loaderService.hide();
          this.toaster.error("Invalid Credentials", "Error", { timeOut: 3000, closeButton: true });
        } else {
          this.toaster.error("An unexpected error occurred.", "Error", { timeOut: 3000, closeButton: true });
        }
      }
    });
  }

  onRegisterSubmit() {
    this.loaderService.show();
    this.registerData = this.registerForm.value;
    delete this.registerData.confirmPassword;
    this.authService.register(this.registerData).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.loaderService.hide();
          this.toaster.success("User Registered Successfully", "Success", { timeOut: 3000, closeButton: true });
          this.isLogin = true;
          this.router.navigateByUrl('/');
        } else {
          this.toaster.error("User Registration Failed", "Error", { timeOut: 3000, closeButton: true });
        }
      },
      error: (error: any) => {
        if (error.error.statusCode == 409) {
          this.loaderService.hide();
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
    
    this.loaderService.show();
    const email = this.loginForm.get('email')?.value;
    this.authService.sendOtp(email).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.loaderService.hide();
          this.toaster.success("OTP Sent Successfully", "Success", { timeOut: 3000, closeButton: true });
          this.otpSent = true; 
          this.countdown = 20;
          this.startCountdown();
        } else {
          this.toaster.error("OTP Not Sent", "Error", { timeOut: 3000, closeButton: true });
        }
      },
      error: (error: any) => {
        this.loaderService.hide();
        this.toaster.error("Unauthorized User", "Error", { timeOut: 3000, closeButton: true });
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
