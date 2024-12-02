import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getUserById(Id: any):Observable<any>{
    return this.http.get(`https://localhost:7053/api/User/getUserById/${Id}`);
  }

  updateUser(user:any):Observable<any>{
    return this.http.put(`https://localhost:7053/api/User/updateUser/${user.id}`, user);
  }


}
