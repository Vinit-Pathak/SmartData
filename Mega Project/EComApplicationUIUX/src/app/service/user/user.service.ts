import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggedUserDto } from '../../models/userLogged.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  http = inject(HttpClient)

  login(credentials: any): Observable<any> {
    return this.http.post(`https://localhost:7053/api/User/login`, credentials);
  }

  register(user:any):Observable<any>{
    return this.http.post('https://localhost:7053/api/User/register', user);
  }

  sendOtp(username:any, password:any): Observable<any> {
    return this.http.get(`https://localhost:7053/api/User/sendOtp/${username}/${password}`);
  }

  forgotPassword(email: string): Observable<any> {
    const params = { email };
    return this.http.get('https://localhost:7053/api/User/forgetPassword', { params });
  }

  changePassword(data:any):Observable<any>{
    return this.http.post('https://localhost:7053/api/User/changePassword', data);
  }

  getUserByEmail(email: any):Observable<any>{
    return this.http.get(`https://localhost:7053/api/User/getUserByEmail/${email}`);
  }
  updateUser(userId: any, user: any):Observable<any>{
    return this.http.put(`https://localhost:7053/api/User/updateUser/${userId}`, user);
  }


}
