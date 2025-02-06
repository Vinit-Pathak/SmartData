import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [GoogleSigninButtonModule],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.css'
})
export class GoogleLoginComponent {
  loginWithGoogle(){}
  socialAuthService = inject(SocialAuthService)
  router = inject(Router)
  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
      if (user) {
        localStorage.setItem('name', user.name);
        this.router.navigate(['/home']);
      }
      else{
        alert("Login Failed")
      }
    });
  }
}
