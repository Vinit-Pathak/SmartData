import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  router = inject(Router);
  imgUrl : string = ''
  userRole = Number(sessionStorage.getItem('role'));
  toaster = inject(ToastrService);

  ngOnInit(): void {
    var data = JSON.parse(sessionStorage.getItem('userData') || '{}');
    this.imgUrl = data.profileImageUrl;
  }

  logout() {
    localStorage.clear();
    localStorage.clear();
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
}
