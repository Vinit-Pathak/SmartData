import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserType } from '../../models/user-type.enum';
import { LoaderService } from '../../service/loader/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
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

  router = inject(Router);
  toaster = inject(ToastrService);
  userService = inject(UserService);
  loaderService = inject(LoaderService)

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
    userType: new FormControl(UserType.Customer, Validators.required),
    otp: new FormControl('', Validators.required),
  });

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    userType: new FormControl(UserType.Customer, Validators.required),
    file: new FormControl<File | null>(null),
    address: new FormControl('', Validators.required),
    zipCode: new FormControl(0, Validators.required),
    state: new FormControl(0, Validators.required),
    country: new FormControl(0, Validators.required),
    isActive: new FormControl(false, Validators.required),
  });


  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.registerForm.patchValue({ file });
    this.registerForm.get('file')?.updateValueAndValidity();
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
  }
  

  onForgotPasswordSubmit() {
    this.loaderService.show();
    if (this.forgotPasswordForm.invalid) {
      this.toaster.warning('Please enter a valid email address.', 'Warning', {
        timeOut: 3000,
        closeButton: true,
      });
      this.loaderService.hide();
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

  onLoginSubmit() {
    if (this.loginForm.invalid) {
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
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('userData', JSON.stringify(res.data.data));
          sessionStorage.setItem('role', res.data.data.userType);
          sessionStorage.setItem('email', res.data.data.email);
          localStorage.setItem('id', res.data.id)
          const expiry = new Date(res.data.expiration);
          sessionStorage.setItem('expiry', expiry.toISOString());
  
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
        const errorMessage =
          error.error.message || 'An unexpected error occurred.';
          this.loaderService.hide();
        this.toaster.error(errorMessage, 'Error', {
          timeOut: 3000,
          closeButton: true,
        });
      },
    });
  }

  sendOtp() {
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
