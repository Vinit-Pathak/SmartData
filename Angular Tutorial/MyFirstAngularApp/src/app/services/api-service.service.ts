import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  onRoleChange$: Subject<any> = new Subject<any>;
  onRole$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  getEmployees() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = "https://localhost:7055/api/Employee" 
  constructor(private http: HttpClient) {

   }

   getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
