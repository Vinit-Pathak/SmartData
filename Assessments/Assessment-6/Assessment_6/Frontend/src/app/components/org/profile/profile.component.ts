import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import {LoaderService} from '../../../service/loader/loader.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.loaderService.show();
      this.authService.getUserByEmail(email).subscribe({
        next: (res: any) => {
          console.log('User Data:', res);  // Check the response in the console
          this.user = res;  
          this.loaderService.hide();
        },
        error: (error: any) => {
          console.error('Failed to load user profile', error);
          this.loaderService.hide();
        }
      });
    }
  }
}