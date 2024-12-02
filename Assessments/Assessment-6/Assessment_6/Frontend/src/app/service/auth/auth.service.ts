import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)

  login(Credentials: any): Observable<any> {
    return this.http.post(`https://localhost:7053/api/Auth/Authenticate`, Credentials);
  }

  register(user:any):Observable<any>{
    return this.http.post('https://localhost:7053/api/User/register', user);
  }

  getUserByEmail(email: string): Observable<any>{
    return this.http.get(`https://localhost:7053/api/User/getUserByEmail/${email}`);
  }
  sendOtp(email:any): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Auth/sendOtp/${email}`);
  }

  updateUser(data:any,id:any):Observable<any>{
    return this.http.put(`https://localhost:7053/api/User/${id}`, data, id)
  }
}
