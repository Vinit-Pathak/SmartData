import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employees: Employee[] = [];
  isEditing = false;
  currentEmployeeIndex: number | null = null;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      employeeId: [''],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      primaryContactNumber: ['', Validators.required],
      secondaryContactNumber: ['', Validators.required],
      gender: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      department: ['', Validators.required],
      jobTitle: ['', Validators.required],
      salary:['', Validators.required],
      startDate: ['', Validators.required],
      employmentType: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.refreshEmployees();
  }

  addOrUpdateEmployee(): void {
    if (this.employeeForm.valid) {
      console.log('Form Data:', this.employeeForm.value);
      if (this.isEditing) {
        this.employeeService.updateEmployee(this.employeeForm.value).subscribe(() => {
          this.refreshEmployees();
          this.resetForm();
        }, error => {
          console.error('Error updating employee:', error);
        });
      } else {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe(() => {
          this.refreshEmployees();
          this.resetForm();
        }, error => {
          console.error('Error adding employee:', error);
        });
      }
    } else {
      console.warn('Form is invalid');
    }
  }
  

  editEmployee(employee: Employee): void {
    this.employeeForm.patchValue(employee);
    this.isEditing = true;
  }

  deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        this.refreshEmployees();
      },
      error: (err) => {
        console.error('Delete error', err);
      }
    });
  }
  resetForm(): void {
    this.employeeForm.reset();
    this.isEditing = false;
  }

  refreshEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      console.log(this.employees);
    });
  }
  formValue: any;

  onSubmit(){

    console.log(this.employeeForm.value);
    if (this.employeeForm.invalid) {
      alert('Please Fill All Fields');
      return;
    }
    if (this.employeeForm.value.id == 0) {
      this.formValue = this.employeeForm.value;
      this.employeeService.addEmployee(this.formValue).subscribe((res) => {

        alert('Employee Added Successfully');
        this.addOrUpdateEmployee();
        this.employeeForm.reset();
        this.refreshEmployees();
      });
    }

  }

}