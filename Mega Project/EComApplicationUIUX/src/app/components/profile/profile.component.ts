import { Component } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  getUserType(userType: number): string {
    switch(userType) {
      case 1:
        return 'Admin';
      case 2:
        return 'Customer';
      default:
        return 'Unknown';
    }
  }


  loadUserProfile() {
    const id = sessionStorage.getItem('id');
    if (id) {
      this.userService.getUserById(id).subscribe({
        next: (res: any) => {
          console.log('User Data:', res);  
          this.user = res;  
        },
        error: (error: any) => {
          console.error('Failed to load user profile', error);
        }
      });
    }
  }
}
