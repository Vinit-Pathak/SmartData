import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.scss'
})
export class FormArrayComponent {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumbers: this.fb.array([this.createPhoneNumber()])
    });
  }

  get phoneNumbers() {
    return this.registrationForm.get('phoneNumbers') as FormArray;
  }

  createPhoneNumber(): FormGroup {
    return this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  addPhoneNumber() {
    if (this.phoneNumbers.length < 2) {
      this.phoneNumbers.push(this.createPhoneNumber());
    }
  }

  removePhoneNumber(index: number) {
    if (this.phoneNumbers.length > 1) {
      this.phoneNumbers.removeAt(index);
    }
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.registrationForm.reset();
  }
}
