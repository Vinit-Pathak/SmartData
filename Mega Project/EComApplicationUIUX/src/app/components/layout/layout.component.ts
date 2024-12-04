import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { UserType } from '../../models/user-type.enum';
import { CartService } from '../../service/cart/cart.service';
declare var bootstrap: any;

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

  newPassword: any;
  confirmPassword: any;
  userDetails: any;
  isUpdating = false;
  UserType = UserType;
  formData: any;
  userRole: any;
  router = inject(Router);
  imgUrl: string = '';
  cartItemCount = 0;
  toaster = inject(ToastrService);
  userService = inject(UserService);
  cartService = inject(CartService);

  @ViewChild('updateProfileModal') updateProfileModal!: ElementRef;
  @ViewChild('changePasswordModal') changePasswordModal!: ElementRef;


  updateProfileForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    dateOfBirth: new FormControl(''),
    userType: new FormControl(UserType),
    address: new FormControl(''),
    file: new FormControl<File | null>(null),
    state: new FormControl(0),
    country: new FormControl(0),
    zipCode: new FormControl(0),
    isActive: new FormControl(true),
  });

  changePasswordForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role') || '';
    this.fetchUserDetails();
    this.checkTokenExpiry();
    var data = JSON.parse(sessionStorage.getItem('userData') || '{}');
    this.imgUrl = data.profileImage;
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
    this.cartService.updateCartItemCount();
  }


  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.updateProfileForm.patchValue({ file });
    this.updateProfileForm.get('file')?.updateValueAndValidity();
  }
  fetchUserDetails() {
    const email = sessionStorage.getItem('email');
    this.userService.getUserByEmail(email).subscribe({
      next: (res: any) => {
        this.userDetails = res;
        // console.log('User Details:', this.userDetails);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  

  openUpdateProfileModal() {
    const modalInstance = new bootstrap.Modal(
      this.updateProfileModal.nativeElement
    );
    modalInstance.show();
    this.OnProfileUpdate();
  }

  OnProfileUpdate() {
    this.isUpdating = true;

    if (this.userDetails) {
      this.userDetails.dateOfBirth = new DatePipe('en-US').transform(
        this.userDetails.dateOfBirth,
        'yyyy-MM-dd'
      );

      
      const userId = this.userDetails.id || 0; 

      this.updateProfileForm.patchValue({
        id: userId,
        firstName: this.userDetails.firstName || '',
        lastName: this.userDetails.lastName || '',
        email: this.userDetails.email || '',
        mobile: this.userDetails.mobile || '',
        dateOfBirth: this.userDetails.dateOfBirth || '',
        userType: this.userDetails.userType || UserType.Customer, 
        address: this.userDetails.address || '',
        state: this.userDetails.state || 0,
        country: this.userDetails.country || 0,
        zipCode: this.userDetails.zipCode || 0,
        isActive: this.userDetails.isActive ?? true, 
      });
    } else {
      console.error('User details are not available.');
    }
  }

  closeUpdateProfileModal() {
    const modalInstance = bootstrap.Modal.getInstance(
      this.updateProfileModal.nativeElement
    );
    this.updateProfileForm.reset();
    modalInstance.hide();
  }

  openChangePasswordModal() {
    const modalInstance = new bootstrap.Modal(
      this.changePasswordModal.nativeElement
    );
    modalInstance.show();
    this.fetchUserDetails();
  }

  closeChangePasswordModal() {
    const modalInstance = bootstrap.Modal.getInstance(
      this.changePasswordModal.nativeElement
    );
    modalInstance.hide();
  }


  onUpdateProfile() {
    if (this.updateProfileForm.invalid) {
      this.toaster.error('Please fill in all required fields.', 'Error', {
        timeOut: 3000,
        closeButton: true,
      });
      return;
    }
  
    
    const userId = this.userDetails?.id || 0; 
    this.updateProfileForm.patchValue({ id: userId });
  
    
    console.log('Form Value:', this.updateProfileForm.value);
  
    const formData = new FormData();
    Object.keys(this.updateProfileForm.controls).forEach((field) => {
      const value = this.updateProfileForm.get(field)?.value;
      if (field !== 'file') {
        formData.append(field, value !== undefined ? value : '');
      } else {
        const fileInput = this.updateProfileForm.get('file')?.value;
        if (fileInput) {
          formData.append('file', fileInput, fileInput.name);
        }
      }
    });

    const idOfUser = this.userDetails.id;
  
    this.userService.updateUser(idOfUser,formData).subscribe({
      next: (res: any) => {
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
    if (this.formData.userName !== this.userDetails.userName) {
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

  userProfileImage: string = 'default.png';

  checkTokenExpiry() {
    const expiryTime = sessionStorage.getItem('expiry');

    if (expiryTime) {
      const expireIn = new Date(expiryTime);
      const currentTime = new Date();

      if (currentTime >= expireIn) {
        this.logout('auto');
      } else {
        const timeRemaining = expireIn.getTime() - currentTime.getTime();
        setTimeout(() => {
          this.logout('auto');
        }, timeRemaining);
      }
    } else {
      this.logout('auto');
    }
  }

  logout(type: 'manual' | 'auto') {
    sessionStorage.clear();
    this.router.navigate(['/']);

    if (type === 'auto') {
      this.toaster.info(
        'Your session has expired. You have been logged out automatically.',
        'Session Expired'
      );
    } else if (type === 'manual') {
      this.toaster.success(
        'You have successfully logged out.',
        'Logout Successful'
      );
    }
  }
}
