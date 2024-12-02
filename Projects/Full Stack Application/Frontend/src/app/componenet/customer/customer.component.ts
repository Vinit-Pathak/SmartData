import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customers: Customer[] = [];
  isEditing = false;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.customerForm = this.fb.group({
      customerId: [''],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      primaryContactNo: ['', Validators.required],
      secondaryContactNo: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      bankName: ['', Validators.required],
      bankBranch: ['', Validators.required],
      qualification: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.refreshCustomer();
  }

  addOrUpdateCustomer(){
    if (this.customerForm.valid) {
      if (this.isEditing) {
        this.customerService.updateCustomer(this.customerForm.value).subscribe({
          next: () => {
            this.refreshCustomer();
            this.resetForm();
          },
          error: (err) => {
            console.error('Update error', err);
          }
        });
      } else {
        this.customerService.addCustomer(this.customerForm.value).subscribe({
          next: () => {
            this.refreshCustomer();
            this.resetForm();
          },
          error: (err) => {
            console.error('Add error', err);
          }
        });
      }
    }
  }

  editCustomer(customer: Customer): void {
    this.customerForm.patchValue(customer);
    this.isEditing = true;
  }

  deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.refreshCustomer();
      },
      error: (err) => {
        console.error('Delete error', err);
      }
    });
  }

  resetForm(): void {
    this.customerForm.reset();
    this.isEditing = false;
  }

  refreshCustomer(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (err) => {
        console.error('Get customers error', err);
      }
    });
  }
}
