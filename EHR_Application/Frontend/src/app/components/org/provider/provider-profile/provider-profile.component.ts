import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../../../others/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { CountryStateService } from '../../../../others/services/countryState/country-state.service';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './provider-profile.component.html',
  styleUrl: './provider-profile.component.css',
})
export class ProviderProfileComponent {
  user: any;
  imgUrl: string = '';
  email: string = '';
  passwordRgx: RegExp =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  newPasswordMismatch: boolean = false;
  userdata = JSON.parse(sessionStorage.getItem('userData') || '{}');
  updateData: any;
  isUpdating: boolean = false;

  @ViewChild('changePasswordModal') changePasswordModal!: ElementRef;
  @ViewChild('updateUserModal') updateUserModal!: ElementRef;

  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private countryState: CountryStateService
  ) {}

  ngOnInit(): void {
    this.imgUrl = this.userdata.profileImageUrl;
    this.email = this.userdata.email;
    this.loadUserProfile();
    this.fetchUserDetails();
    this.getAllCountry();
    this.getAllSpecialisation();
    this.sanitizeField('firstName');
    this.sanitizeField('lastName');
    this.sanitizeField('city');
    this.sanitizeField('qualification');
    this.changePasswordForm.valueChanges.subscribe(() => {
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const confirmPassword =
        this.changePasswordForm.get('confirmPassword')?.value;
      this.newPasswordMismatch = newPassword !== confirmPassword;
    });
  }

  defaultImageUrl: string = 'assets/images/default-user-image.png';

  onImageError(event: any) {
    event.target.src = this.defaultImageUrl;
  }

  getUserType(userTypeId: number): string {
    switch (userTypeId) {
      case 1:
        return 'Patient';
      case 2:
        return 'Provider';
      default:
        return 'Unknown';
    }
  }

  sanitizeField(fieldName: string): void {
    this.updateUserForm.get(fieldName)?.valueChanges.subscribe((value) => {
      if (value) {
        const sanitizedValue = value
          .replace(/[^A-Za-z\s]/g, '')
          .replace(/\s{2,}/g, ' ');
        if (value !== sanitizedValue) {
          this.updateUserForm.get(fieldName)?.setValue(sanitizedValue, {
            emitEvent: false,
          });
        }
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.updateUserForm.patchValue({ file });
    this.updateUserForm.get('file')?.updateValueAndValidity();
  }
  changePasswordForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRgx),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRgx),
    ]),
  });


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

  loadUserProfile() {
    if (this.email) {
      this.userService.getUserByEmail(this.email).subscribe({
        next: (res: any) => {
          this.user = res.data[0];
          console.log('User Data By Email:', this.user);
        },
        error: (error: any) => {
          console.error('Failed to load user profile', error);
        },
      });
    }
  }

  fetchUserDetails() {
    const userId = Number(this.userdata.userId);
    this.userService.getUserById(userId).subscribe({
      next: (res: any) => {
        this.updateData = res.data;
        console.log('User Data by Id:', this.updateData);
        this.loadState(this.updateData.country);
      },
      error: (error: any) => {
        console.error('Failed to load user profile', error);
      },
    });
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
      newPassword: newPassword,
    };

    if (!this.userdata.userName) {
      this.toaster.error('Invalid Username', 'Error', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
      });
      return;
    }

    this.userService.changePassword(changePasswordData).subscribe({
      next: (res: any) => {
        if (res.statusCode !== 200) {
          this.toaster.error(res.message, 'Error', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          return;
        }

        this.toaster.success('Password Changed Successfully', 'Success', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
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
            progressBar: true,
            progressAnimation: 'increasing',
              }
        );
      },
    });
  }

  updateUserForm = new FormGroup({
    userId: new FormControl(0),
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
    mobile: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/)]),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    bloodGroup: new FormControl('', Validators.required),
    file: new FormControl<File | null>(null),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150),
      Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    pinCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{6}$/),
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),

    
    qualification: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*\s*$/),
    ]),
    specializationId: new FormControl('', Validators.required),
    registrationNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*\s*$/),
    ]),
    visitingCharge: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(6),
      Validators.pattern(/^\d{1,6}$/),
    ]),
  });

  openUpdateUserModal() {
    const modalInstance = new bootstrap.Modal(
      this.updateUserModal.nativeElement
    );
    modalInstance.show();
    this.fetchUserDetails();
    this.onProfileUpdate();
  }

  closeUpdateUserModal() {
    const modalInstance = bootstrap.Modal.getInstance(
      this.updateUserModal.nativeElement
    );
    modalInstance.hide();
    this.updateUserForm.reset();
  }

  onProfileUpdate() {
    this.isUpdating = true;
    if (this.updateData) {
      this.updateData.dateOfBirth = new DatePipe('en-US').transform(
        this.updateData.dateOfBirth,
        'yyyy-MM-dd'
      );
    }
    this.updateUserForm.patchValue(this.updateData);
    this.onChange(this.updateData.country);

    console.log('User Data on click:', this.updateData);
  }

  onUpdateUser() {
    if (this.updateUserForm.invalid) {
      this.toaster.error('Please fill in all required fields.', 'Error', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
      });
      return;
    }

    const userId = Number(this.userdata.userId);

    console.log('Form Value:', this.updateUserForm.value);

    const formData = new FormData();
    Object.keys(this.updateUserForm.controls).forEach((field) => {
      const value = this.updateUserForm.get(field)?.value;
      if (field !== 'file') {
        formData.append(field, value !== undefined ? value : '');
      } else {
        const fileInput = this.updateUserForm.get('file')?.value;
        if (fileInput) {
          formData.append('file', fileInput, fileInput.name);
        }
      }
    });

    const idOfUser = Number(this.updateData.userId);

    this.userService.updateProvider(formData).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.toaster.success('Profile Updated Successfully', 'Success', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          window.location.reload();
          console.log('Profile Updated:', res.data);
          sessionStorage.setItem('userData', JSON.stringify(res.data));
          this.closeUpdateUserModal();
        } else {
          this.toaster.error('Failed to update profile', 'Error', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }
      },
      error: (err: any) => {
        console.error('Error updating profile:', err);
        
        this.toaster.error(
          err?.error?.message ||
            'Failed to update profile. Please try again later.',
          'Error',
          {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
          }
        );
      },
    });
  }

  allCountry: any[] = [];

  getAllCountry() {
    this.countryState.getAllCountry().subscribe({
      next: (res: any) => {
        this.allCountry = res;
        
      },
      error: (error: any) => {
        alert('I am in error');
      },
    });
  }

  allState: any[] = [];

  allStateByCountryId: any[] = [];
  formData: any;
  isStateLoaded = false;
  loadState(countryId: any) {
    this.countryState.getStateByCountryId(countryId).subscribe((data: any) => {
      this.allState = data;
    });
  }

  onChange(countrId: any) {
    
    this.countryState.getStateByCountryId(countrId).subscribe({
      next: (res: any) => {
        this.allStateByCountryId = res;
      },
      error: (error: any) => {
        console.log('I am in error');
      },
    });
  }
}
