import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  getUserByEmail(email: string) {
    return this.http.get(`https://localhost:7053/api/User/getUserByEmail/${email}`);
  }

  changePassword(data:any){
    return this.http.post(`https://localhost:7053/api/User/changePassword`, data);
  }

  updateUser(data:any){
    return this.http.put(`https://localhost:7053/api/User/updateUser`, data);
  }
  
  getUserById(id: number) {
    return this.http.get(`https://localhost:7053/api/User/getUserById/${id}`);
  }

  getAllSpecialisation(){
    return this.http.get(`https://localhost:7053/api/Appointment/getAllSpecialisation`);
  }


}
