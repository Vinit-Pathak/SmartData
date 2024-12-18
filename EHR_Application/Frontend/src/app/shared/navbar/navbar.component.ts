import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router);
  imgUrl : string = ''
  userRole : number = 0;
  toaster = inject(ToastrService);
  
  ngOnInit(): void {
    var data = JSON.parse(sessionStorage.getItem('userData') || '{}');
    this.imgUrl = data.profileImageUrl;
    this.userRole = Number(sessionStorage.getItem('role'));
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
    this.toaster.success(
        'You have successfully logged out.',
        'Logout Successful',
        {
          timeOut: 2000,
          closeButton: true,
        }
      );
  }
  
  getUserType(userRole: number): string {
    switch (userRole) {
      case 1:
        return 'Patient';
      case 2:
        return 'Provider';
      default:
        return 'Unknown';
    }
  }
}
