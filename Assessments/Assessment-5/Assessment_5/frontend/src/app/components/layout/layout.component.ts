import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  router = inject(Router)
  toaster = inject(ToastrService)
 logout(){
  localStorage.clear();
  this.router.navigate(["/"]);  
  this.toaster.success("You have successfully logged out.", "Logout Successful");
 }
}
