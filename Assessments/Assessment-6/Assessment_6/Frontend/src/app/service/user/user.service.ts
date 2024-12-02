import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7053/api/User';
  http = inject(HttpClient);

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllUsers`);
  }

  deleteUser(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
