import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7123/api/Employee';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getAllEmployee() {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(employee: Employee){
    return this.http.put<Employee>(`${this.apiUrl}/${employee.employeeId}`, employee);
  }

  deleteEmployee(employeeId: number){
    return this.http.delete<void>(`${this.apiUrl}/${employeeId}`);
  }
}