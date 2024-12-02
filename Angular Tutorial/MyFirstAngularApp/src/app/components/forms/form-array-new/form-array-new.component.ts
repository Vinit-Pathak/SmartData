import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-array-new',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-array-new.component.html',
  styleUrls: ['./form-array-new.component.scss']
})
export class FormArrayNewComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      forms: this.fb.array([])
    });
    // Initialize with one form
    this.addForm();
  }

  get forms(): FormArray {
    return this.registrationForm.get('forms') as FormArray;
  }

  createPhoneNumber(): FormGroup {
    return this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  createForm(name: string): FormGroup {
    return this.fb.group({
      formName: [name, Validators.required],
      userName: ['', Validators.required],
      phoneNumbers: this.fb.array([this.createPhoneNumber()])
    });
  }

  addForm() {
    const formCount = this.forms.length + 1;
    const formName = `Form${formCount}`;
    this.forms.push(this.createForm(formName));
  }

  removeForm(index: number) {
    if (this.forms.length > 1) {
      this.forms.removeAt(index);
    }
  }

  addPhoneNumber(formIndex: number) {
    const phoneNumbers = this.getPhoneNumbers(formIndex);
    phoneNumbers.push(this.createPhoneNumber());
  }

  removePhoneNumber(formIndex: number, phoneIndex: number) {
    const phoneNumbers = this.getPhoneNumbers(formIndex);
    if (phoneNumbers.length > 1) {
      phoneNumbers.removeAt(phoneIndex);
    }
  }

  getPhoneNumbers(formIndex: number): FormArray {
    return this.forms.at(formIndex).get('phoneNumbers') as FormArray;
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.registrationForm.reset();
  }
}
