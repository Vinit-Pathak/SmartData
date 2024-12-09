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
  imgUrl: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
    var data = JSON.parse(sessionStorage.getItem('userData') || '{}');
    this.imgUrl = data.profileImage
  }

  // Default fallback image URL
  defaultImageUrl: string = 'assets/images/default-user-image.png';

  // Handling image error
  onImageError(event: any) {
    event.target.src = this.defaultImageUrl;
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
    const email = sessionStorage.getItem('email');
    if (email) {
      this.userService.getUserByEmail(email).subscribe({
        next: (res: any) => {
          this.user = res.data[0];
          localStorage.setItem('data', JSON.stringify(res.data));  
          console.log('User Data:', this.user);  
        },
        error: (error: any) => {
          console.error('Failed to load user profile', error);
        }
      });
    }
  }
}
