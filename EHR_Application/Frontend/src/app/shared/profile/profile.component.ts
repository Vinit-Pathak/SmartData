import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../others/services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any;
  imgUrl: string = '';
  email: string = ''
  passwordRgx: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
  newPasswordMismatch: boolean = false;
  userdata = JSON.parse(sessionStorage.getItem('userData') || '{}');


  @ViewChild('changePasswordModal') changePasswordModal!: ElementRef;
  constructor(private userService: UserService, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.imgUrl = this.userdata.profileImageUrl
    this.email = this.userdata.email
    this.loadUserProfile();

    this.changePasswordForm.valueChanges.subscribe(() => {
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value;
      this.newPasswordMismatch = newPassword !== confirmPassword;
    });
  }

  defaultImageUrl: string = 'assets/images/default-user-image.png';

  onImageError(event: any) {
    event.target.src = this.defaultImageUrl;
  }

  getUserType(userTypeId: number): string {
    switch(userTypeId) {
      case 1:
        return 'Patient';
      case 2:
        return 'Provider';
      default:
        return 'Unknown';
    }
  }

  changePasswordForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRgx)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRgx)
    ]),
  });

  loadUserProfile() {
    if (this.email) {
      this.userService.getUserByEmail(this.email).subscribe({
        next: (res: any) => {
          this.user = res.data[0];
          // sessionStorage.setItem('data', JSON.stringify(res.data));  
          console.log('User Data:', this.user);  
        },
        error: (error: any) => {
          console.error('Failed to load user profile', error);
        }
      });
    }
  }


  openChangePasswordModal() {
    const modalInstance = new bootstrap.Modal(
      this.changePasswordModal.nativeElement
    );
    modalInstance.show();
    this.changePasswordForm.reset();
  }

  closeChangePasswordModal() {
    const modalInstance = bootstrap.Modal.getInstance(
      this.changePasswordModal.nativeElement
    );
    modalInstance.hide();
    this.changePasswordForm.reset();
  }

  onChangePassword() {
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const username = this.userdata.userName;

    const changePasswordData = {
      username: username,
      newPassword: newPassword
    };

    if (!this.userdata.userName) {
      this.toaster.error('Invalid Username', 'Error', {
        timeOut: 2000,
        closeButton: true,
      });
      return;
    }

    this.userService.changePassword(changePasswordData).subscribe({
      next: (res: any) => {
        if (res.statusCode !== 200) {
          this.toaster.error(res.message, 'Error', {
            timeOut: 2000,
            closeButton: true,
          });
          return;
        }

        this.toaster.success('Password Changed Successfully', 'Success', {
          timeOut: 2000,
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
            timeOut: 2000,
            closeButton: true,
          }
        );
      },
    });
  }
}
