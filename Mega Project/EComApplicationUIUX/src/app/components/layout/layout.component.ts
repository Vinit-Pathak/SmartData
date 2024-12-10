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
import { CountryStateService } from '../../service/countryState/country-state.service';
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
  newPasswordMismatch = false;
  todayDate=new Date().toISOString().split('T')[0];
  passwordRgx: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
  toaster = inject(ToastrService);
  userService = inject(UserService);
  cartService = inject(CartService);
  countryStateService = inject(CountryStateService);

  @ViewChild('updateProfileModal') updateProfileModal!: ElementRef;
  @ViewChild('changePasswordModal') changePasswordModal!: ElementRef;


  updateProfileForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl('',[Validators.required,Validators.minLength(2), Validators.maxLength(20), Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*\s*$/)]),
    lastName: new FormControl('',[Validators.required,Validators.minLength(2), Validators.maxLength(20), Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*\s*$/)]),
    email: new FormControl(''),
    mobile: new FormControl('',new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ])),
    dateOfBirth: new FormControl('', Validators.required),
    userType: new FormControl(UserType),
    address: new FormControl('',  [Validators.required, Validators.minLength(10), Validators.maxLength(150), Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/)]),
    file: new FormControl<File | null>(null),
    state: new FormControl("", Validators.required),
    country: new FormControl("", Validators.required),
    zipCode: new FormControl(0,[Validators.required, Validators.pattern(/^\d{6}$/), Validators.minLength(6), Validators.maxLength(6)]),
    // isActive: new FormControl(true),
  });

  changePasswordForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRgx)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRgx)
    ]),
  });

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe((cartItem)=>{
      this.cartItemCount = cartItem.length;
      // console.log("Cart: ",cartItem);
      
    })
    this.userRole = sessionStorage.getItem('role') || '';
    this.fetchUserDetails();
    this.checkTokenExpiry();
    var data = JSON.parse(sessionStorage.getItem('userData') || '{}');
    this.imgUrl = data.profileImage;
    // this.cartService.cartItemCount$.subscribe((count) => {
    //   this.cartItemCount = count;
    // });

    this.changePasswordForm.valueChanges.subscribe(() => {
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const confirmPassword = this.changePasswordForm.get('confirmNewPassword')?.value;
      this.newPasswordMismatch = newPassword !== confirmPassword;
    });
    this.cartService.updateCartItemCount();
    this.getAllCountry();
    this.loadState(0);
    this.sanitizeField('firstName');
    this.sanitizeField('lastName');

    
    
  }


  sanitizeField(fieldName: string): void {
    this.updateProfileForm.get(fieldName)?.valueChanges.subscribe((value) => {
      if (value) {
        
        const sanitizedValue = value
          .replace(/[^A-Za-z\s]/g, '') 
          .replace(/\s{2,}/g, ' '); 
        if (value !== sanitizedValue) {
          this.updateProfileForm.get(fieldName)?.setValue(sanitizedValue, {
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
    this.updateProfileForm.patchValue({ file });
    this.updateProfileForm.get('file')?.updateValueAndValidity();
  }

  fetchUserDetails() {
    // const email = sessionStorage.getItem('email');
    const userId = localStorage.getItem('id');
    this.userService.getUserById(userId).subscribe({
      next: (res: any) => {
        this.userDetails = res.data;
        console.log('User Details:', this.userDetails);
        this.loadState(this.userDetails.country);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  
  allCountry : any [] = []


  getAllCountry(){
    this.countryStateService.getAllCountry().subscribe({
      next : (res: any) => {
        this.allCountry = res
        // console.log(this.allCountry)
      },
      error : (error: any) =>{
        alert("I am in error")
      }
      
    })
  }

  allState : any [] = []

  allStateByCountryId: any[] = []

  isStateLoaded = false;
  loadState(countryId: number){
    this.countryStateService.getStateByCountryId(countryId).subscribe((data: any)=>{
          this.allState = data;
          // console.log(data)
          // Set the selected state in the form
          if (this.formData) {
            this.updateProfileForm.patchValue({
              state: this.formData.state
            });
          }
          // this.isStateLoaded = true;
        });
  }

  onChange(countrId : any){
    // console.log(countrId)
    this.countryStateService.getStateByCountryId(countrId).subscribe({
      next : (res:any) => {
        this.allStateByCountryId = res
      },
      error : (error: any) => {
        console.log("I am in error")
      }
    })
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
        state: this.userDetails.state || '',
        country: this.userDetails.country || '',
        zipCode: this.userDetails.zipCode || 0,
        // isActive: this.userDetails.isActive ?? true, 
      });
      
      console.log('User Details on click:', this.userDetails);
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
    this.changePasswordForm.reset();
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
        console.log('Profile Updated:', res.data);
        sessionStorage.setItem('userData', JSON.stringify(res.data));
        this.imgUrl =res.data.profileImage;
        window.location.reload();
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
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const username = this.userDetails.userName;

    const changePasswordData = {
      username: username,
      newPassword: newPassword
    };

    if (!this.userDetails.userName) {
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




  getState(countrId : any){
    this.countryStateService.getStateByCountryId(countrId).subscribe({
      next : (res:any) => {
        this.allState = res
        console.log(this.allState);
        this.isStateLoaded = true;
        
      },
      error : (error: any) => {
        alert("I am in error")
      }
    })
  }






  getCountryName(countryId: number): string {
    const country = this.allCountry.find(c => c.countryId === countryId);
    return country ? country.name : 'Not Found';
  }

  getStateName(stateId: number): string {
    const state = this.allState.find(s => s.stateId === stateId);
    return state ? state.name : 'Not Found';
  }

}
