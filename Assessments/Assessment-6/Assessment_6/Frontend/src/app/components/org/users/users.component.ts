import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from '../../../service/loader/loader.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any[]=[];
  role=sessionStorage.getItem('role')
  isUpdating=false;
  
  userService=inject(UserService)
  toastr=inject(ToastrService)
  admin=inject(AuthService)
  loaderService = inject(LoaderService)
  ngOnInit(): void {
      this.getAllUsers()
  }

  getAllUsers() {
    this.loaderService.show();
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.loaderService.hide();
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loaderService.hide();
      }
    });
  }

  updateForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    role:new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  onEdit(user: any) {
    this.loaderService.show();
    setTimeout(() => {
      this.isUpdating = true;
      this.updateForm.patchValue({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email
      });
      this.loaderService.hide();
    }, 100); 
  }


  onDelete(id: number) {
    const isConfirmed = confirm('Are you sure you want to delete this employee');
    if (isConfirmed) {
      this.loaderService.show();
      this.userService.deleteUser(id).subscribe({
        next: (res) => {
          this.toastr.error("User Deleted Successfully", 'Deleted', { timeOut: 3000, closeButton: true });
          this.getAllUsers();
          this.loaderService.hide();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          this.loaderService.hide();
        }
      });
    }
  }

  onUpdate() {
    const userId = this.updateForm.value.id;
    this.loaderService.show();
    this.admin.updateUser(this.updateForm.value, userId).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success("User Updated Successfully");
          this.isUpdating = !this.isUpdating;
          this.getAllUsers();
          this.loaderService.hide();
        }
      },
      error: (err) => {
        console.error('Error updating user:', err);
        this.loaderService.hide();
      }
    });
  }

  OnBack(){
    this.isUpdating=false
  }
}