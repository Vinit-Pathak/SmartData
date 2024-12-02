import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient/patient.service';
import { CommonModule } from '@angular/common';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patientForm: FormGroup;
  isEditMode = false;
  patients: Patient[] = [];
  currentEditIndex: number | null = null;

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.patientForm = this.fb.group({
      patientId: [''],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      primaryContactNumber: ['', Validators.required],
      secondaryContactNumber: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      insuranceProvider: ['', Validators.required],
      insurancePolicyNumber: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      allergies: ['', Validators.required],
      currentMedications: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.refreshPatients();
  }

  addOrUpdatePatient(): void {
    if (this.isEditMode) {
      this.patientService.updatePatient(this.patientForm.value).subscribe(() => {
        this.refreshPatients();
        this.resetForm(this.patientForm);
      });
    } else {
      this.patientService.addPatient(this.patientForm.value).subscribe(() => {
        this.refreshPatients();
        this.resetForm(this.patientForm);
      });
    }
  }


    editPatient(patient: Patient): void {
    this.patientForm.patchValue(patient);
    this.isEditMode = true;
  }

  // deletePatient(patientId: number): void {
  //   this.patientService.deletePatient(patientId).subscribe(() => {
  //     this.refreshPatients();
  //   });
  // }
  deletePatient(patientId: number): void {
    this.patientService.deletePatient(patientId).subscribe({
      next: () => {
        this.refreshPatients();
      },
      error: (err) => {
        console.error('Delete error', err);
      }
    });
  }


  resetForm(form: FormGroup): void {
    form.reset();
    this.isEditMode = false;
  }

  refreshPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (err) => {
        console.error('Get customers error', err);
      }
    });
  }

  onSubmit(): void {

    if (this.patientForm.valid) {

      if (this.isEditMode && this.currentEditIndex !== null) {

        this.patients[this.currentEditIndex] = this.patientForm.value;

        this.isEditMode = false;

        this.currentEditIndex = null;

      } else {

        this.patients.push(this.patientForm.value);

      }

      this.patientForm.reset();

    }

  }
}