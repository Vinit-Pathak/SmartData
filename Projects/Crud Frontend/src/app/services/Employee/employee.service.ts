import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../../models/employee/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7123/api/Employee'
  constructor() { }
  http = inject(HttpClient)

  getAllEmployees() {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(data: any){
    return this.http.post<Employee>(this.apiUrl, data);
  }

  updateEmployee(employee: Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}/${employee.employeeId}`, employee);
  }

  deleteEmployee(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
