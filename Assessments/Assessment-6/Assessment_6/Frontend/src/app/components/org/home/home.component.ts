import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatPopupComponent } from "../chat-popup/chat-popup.component";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  router = inject(Router)
  toaster = inject(ToastrService)

  ngOnInit(): void {
    this.checkTokenExpiry();
  }
  
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
  
  userRole : string ='';
  constructor(){
    this.userRole = sessionStorage.getItem('role') || '';
  }

  logout(type: 'manual' | 'auto') {
    
    sessionStorage.clear();
    this.router.navigate(["/"]);  

    if (type === 'auto') {
      this.toaster.info("Your session has expired. You have been logged out automatically.", "Session Expired");
    } else if (type === 'manual') {
      this.toaster.success("You have successfully logged out.", "Logout Successful");
    }
  }

}
