import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)

  login(credentials: any): Observable<any> {
    return this.http.post(`https://localhost:7053/api/Auth/login`, credentials);
  }

  sendOtp(username:any, password:any): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Auth/sendOtp/${username}/${password}`);
  }

  forgotPassword(email: string): Observable<any> {
    const params = { email };
    return this.http.get('https://localhost:7053/api/Auth/forgotPassword', { params });
  }

  register(user:any):Observable<any>{
    return this.http.post('https://localhost:7053/api/Auth/registration', user);
  }

}
