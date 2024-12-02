import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../services/utils/session';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  session = inject(UtilsService)
  router = inject(Router)
  toaster = inject(ToastrService)

 
  ngOnInit(): void {
    this.checkTokenExpiry();
  }
  
  checkTokenExpiry() {
    const expiryTime = localStorage.getItem('expiry');
    
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
    
    localStorage.clear();
    this.session.setSession(false);
    this.router.navigate(["/"]);  

    if (type === 'auto') {
      this.toaster.info("Your session has expired. You have been logged out automatically.", "Session Expired");
    } else if (type === 'manual') {
      this.toaster.success("You have successfully logged out.", "Logout Successful");
    }
  }
}