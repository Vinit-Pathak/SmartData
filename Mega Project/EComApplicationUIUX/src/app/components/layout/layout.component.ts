import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserType } from '../../models/user-type.enum';
declare var bootstrap: any;

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule, ReactiveFormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  updateProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  userDetails: any;
  newPassword:any;
  confirmPassword:any;
  isUpdating = false;
  UserType = UserType;
  formData: any;
  userRole :any;
  userService = inject(UserService);
  router = inject(Router);
  toaster = inject(ToastrService);

  @ViewChild('updateProfileModal') updateProfileModal!: ElementRef;
  @ViewChild('changePasswordModal') changePasswordModal!: ElementRef;

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

    this.userRole = sessionStorage.getItem('role') || '';
  }

  ngOnInit(): void {
    this.fetchUserDetails();
    this.checkTokenExpiry();
  }

  fetchUserDetails() {
    const id = sessionStorage.getItem('id');
    this.userService.getUserById(id).subscribe({
      next: (res: any) => {
        this.userDetails = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // openUpdateProfileModal() {
  //   const modal = document.getElementById('updateProfileModal');
  //   if (modal) {
  //     modal.style.display = 'block';
  //   }
  //   this.OnProfileUpdate();
  // }

  openUpdateProfileModal() {
    const modalInstance = new bootstrap.Modal(this.updateProfileModal.nativeElement);
    modalInstance.show();
    this.OnProfileUpdate();
  }

  OnProfileUpdate() {
    this.isUpdating = true;
    console.log('User Details:', this.userDetails);
    this.userDetails.dateOfBirth = new DatePipe('en-US').transform(this.userDetails.dateOfBirth, 'yyyy-MM-dd');
    this.updateProfileForm.patchValue(this.userDetails);
  }

  // closeUpdateProfileModal() {
  //   const modal = document.getElementById('updateProfileModal');
  //   if (modal) {
  //     modal.style.display = 'none';
  //   }
  // }

  closeUpdateProfileModal() {
    const modalInstance = bootstrap.Modal.getInstance(this.updateProfileModal.nativeElement);
    modalInstance.hide();
  }

  // openChangePasswordModal() {
  //   const modal = document.getElementById('changePasswordModal');
  //   if (modal) {
  //     modal.style.display = 'block';
  //   }
  //   this.fetchUserDetails();
  // }

  openChangePasswordModal() {
    const modalInstance = new bootstrap.Modal(this.changePasswordModal.nativeElement);
    modalInstance.show();
    this.fetchUserDetails();
  }

  // closeChangePasswordModal() {
  //   const modal = document.getElementById('changePasswordModal');
  //   if (modal) {
  //     modal.style.display = 'none';
  //   }
  // }

  closeChangePasswordModal() {
    const modalInstance = bootstrap.Modal.getInstance(this.changePasswordModal.nativeElement);
    modalInstance.hide();
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

  userProfileImage: string = "default.png";

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
    this.router.navigate(["/"]);  

    if (type === 'auto') {
      this.toaster.info("Your session has expired. You have been logged out automatically.", "Session Expired");
    } else if (type === 'manual') {
      this.toaster.success("You have successfully logged out.", "Logout Successful");
    }
  }

}
