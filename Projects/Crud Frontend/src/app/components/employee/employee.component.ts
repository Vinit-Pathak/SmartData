import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee/employee';
import { EmployeeService } from '../../services/Employee/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({});
  employees: any[] = [];
  isEditing: boolean = false;
  constructor(private fb : FormBuilder, private empService: EmployeeService){
    
  }

  setFormState(){
    this.employeeForm = this.fb.group({
      // employeeId: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob:['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      primaryContactNumber: ['',Validators.required],
      secondaryContactNumber: ['', Validators.required],
      gender:['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode:['', Validators.required],
      department: ['', Validators.required],
      startDate: ['', Validators.required],
      employementType: ['', Validators.required],
      jobTitle: ['', Validators.required],
      salary:['', Validators.required],
      isTermsAccepted: [false, Validators.required]
    })
  }
  onEdit(employee: Employee){
    this.isEditing = true;
    this.openModal();
    const formattedEmployee = {
      ...employee,
      dob: new DatePipe('en-US').transform(employee.dob, 'yyyy-MM-dd'),
      startDate: new DatePipe('en-US').transform(employee.startDate, 'yyyy-MM-dd')
    };
    this.employeeForm.patchValue(formattedEmployee);
  }
   onAdd() {
     this.isEditing = false;
     this.employeeForm.reset();
    this.openModal();
  }

  OnSubmit(){
    if(this.employeeForm.invalid){
      alert("Please enter all fields");
      return;
    }
    this.formValue = this.employeeForm.value;
    if(this.isEditing){
      this.updateEmployee();
    } else {
      this.empService.addEmployee(this.formValue).subscribe((res)=>{
        console.log(res)
        alert("Employee Added Successfully");
        this.getEmployess();
        this.employeeForm.reset();
        this.closeModal();
      },
      (error) =>{
        console.log('Error adding employee',error);
        alert("Error adding employee " + error.message);
      }
    );
    }
  }

  updateEmployee() {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      this.empService.updateEmployee(employee)
        .subscribe({
          next: (updatedEmployee: Employee) => {
            console.log('Employee updated successfully', updatedEmployee);
            alert("Employee Updated Successfully");
            this.getEmployess();
            this.employeeForm.reset();
            this.closeModal();
            this.isEditing = false;
          },
          error: (error: any) => {
            console.error('Error updating employee', error);
          }
        });
    }
  }

  openModal(){
    const modal = document.getElementById('myModal')
    if(modal != null){
      modal.style.display = "block";
    }
  }
  closeModal(){
    this.setFormState();
    const modal = document.getElementById('myModal')
    if(modal != null){
      modal.style.display = "none";
    }
  }
  ngOnInit() {
    this.setFormState();
    this.getEmployess()
    this.employeeForm.reset();
  }

  getEmployess(){
    this.empService.getAllEmployees().subscribe(res => {
      this.employees = res;
    });
  }

  // onEdit(employee: Employee){
  //   this.openModal();
  //   this.employeeForm.patchValue(employee);
  // }

  onDelete(id: number){
    const isConfirmed = confirm('Are you sure you want to delete this employee');
    if(isConfirmed){
      this.empService.deleteEmployee(id).subscribe((res)=>{
        alert("Employee Deleted Successfully");
        this.getEmployess();
      })
    }
  }

  formValue: any;
  // OnSubmit(){
  //   console.log(this.employeeForm.value)
  //   if(this.employeeForm.invalid){
  //     alert("Please enter all fields");
  //     return;
  //   }
  //   this.formValue = this.employeeForm.value;
  //   this.empService.addEmployee(this.formValue).subscribe((res)=>{
  //     alert("Employee Added Successfully");
  //     this.getEmployess();
  //     this.employeeForm.reset();
  //     this.closeModal()
  //   })
  // }
}
