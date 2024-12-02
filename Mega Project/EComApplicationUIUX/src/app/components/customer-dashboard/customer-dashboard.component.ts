import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserType } from '../../models/user-type.enum';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
})
export class CustomerDashboardComponent {
  updateProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  customerDetails: any;
  newPassword:any;
  confirmPassword:any;
  isUpdating = false;
  UserType = UserType;
  formData: any;
  userService = inject(UserService);
  router = inject(Router);
  toaster = inject(ToastrService);
  userRole : any;

  constructor(private fb: FormBuilder) {
    this.updateProfileForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      userType: [UserType, Validators.required],
      address: ['', Validators.required],
      profileImage: ['', Validators.required],
      state: [0, Validators.required],
      country: [0, Validators.required],
      zipCode: [0, Validators.required],
      isActive: [true, Validators.required],
    });

    this.changePasswordForm = this.fb.group({
      userName: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchCustomerDetails();
  }

  fetchCustomerDetails() {
    const id = sessionStorage.getItem('id');
    this.userService.getUserById(id).subscribe({
      next: (res: any) => {
        this.customerDetails = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openUpdateProfileModal() {
    const modal = document.getElementById('updateProfileModal');
    if (modal) {
      modal.style.display = 'block';
    }
    this.OnProfileUpdate();
  }

  OnProfileUpdate() {
    this.isUpdating = true;
    console.log('Customer Details:', this.customerDetails);
    this.customerDetails.dateOfBirth = new DatePipe('en-US').transform(this.customerDetails.dateOfBirth, 'yyyy-MM-dd');
    this.updateProfileForm.patchValue(this.customerDetails);
  }

  closeUpdateProfileModal() {
    const modal = document.getElementById('updateProfileModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  openChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
      modal.style.display = 'block';
    }
    this.fetchCustomerDetails();
  }

  closeChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onUpdateProfile() {
    this.userService.updateUser(this.updateProfileForm.value).subscribe({
      next: (res: any) => {
        console.log('Profile Updated:', res);
        this.isUpdating = !this.isUpdating;
        this.toaster.success('Profile Updated Successfully', 'Success', {
          timeOut: 3000,
          closeButton: true,
        });
        this.closeUpdateProfileModal();
      },
      error: (err: any) => {
        this.toaster.error('Profile Update Failed', 'Error', {
          timeOut: 3000,
          closeButton: true,
        });
        console.log(err);
      },
    });
  }

  onChangePassword() {
    this.formData = this.changePasswordForm.value;
    delete this.formData.confirmPassword;
    if (this.formData.userName !== this.customerDetails.userName) {
      this.toaster.error('Invalid Username', 'Error', {
        timeOut: 3000,
        closeButton: true,
      });
      return;
    }


    this.userService.changePassword(this.formData).subscribe({
      next: (res: any) => {
        if (res.statusCode !== 200) {
          this.toaster.error(res.message, 'Error', {
            timeOut: 3000,
            closeButton: true,
          });
          return;
        }

        this.toaster.success('Password Changed Successfully', 'Success', {
          timeOut: 3000,
          closeButton: true,
        });
        this.changePasswordForm.reset();
        this.closeChangePasswordModal();
      },
      error: (err: any) => {
        console.error('Error changing password:', err);

        this.toaster.error(
          err?.error?.message ||
            'Failed to change password. Please try again later.',
          'Error',
          {
            timeOut: 3000,
            closeButton: true,
          }
        );
      },
    });
  }

  logout() {
    this.router.navigate(['/']);
  }
}
