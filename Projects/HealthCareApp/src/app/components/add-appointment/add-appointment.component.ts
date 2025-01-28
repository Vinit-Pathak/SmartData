import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Appointment } from '../../store/appointment.state';
import { addAppointment } from '../../store/appointment.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})
export class AddAppointmentComponent {
  appointmentForm: FormGroup;
  minDate = new Date().toISOString().split('T')[0]

  constructor(private fb: FormBuilder, private store: Store){
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      doctorName: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    })
  }

  addAppointment(){
    if(this.appointmentForm.valid){
        const appointment: Appointment = {
          id: Date.now(),
          ...this.appointmentForm.value
        }
        console.log('Dispatching Add Appointment: ', appointment);
        this.store.dispatch(addAppointment({appointment}))
        this.appointmentForm.reset();
    }
  }
}
