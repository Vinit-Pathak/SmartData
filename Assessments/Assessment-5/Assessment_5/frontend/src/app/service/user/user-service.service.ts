import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  http = inject(HttpClient)

  login(credentials: any): Observable<any> {
    return this.http.post(`${"https://localhost:7194/api/User"}/login`, credentials);
  }
  
  register(user: any): Observable<any> {
    return this.http.post(`${"https://localhost:7194/api/User"}/register`, user);
  }
  sendOtp(email:any): Observable<any> {
    return this.http.get(`https://localhost:7194/api/User/sendotp/${email}`);
  }
}
