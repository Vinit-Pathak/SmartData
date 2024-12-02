import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../../services/api-service.service';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})
export class ReactiveFormComponent {
  studentForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(4)]),
    userName: new FormControl("", [Validators.required, Validators.email]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    zipCode: new FormControl("", [Validators.required]),
    isAcceptedTerms: new FormControl("", [Validators.required])
  });
   
  currentRole:any ='';
  constructor(private service: ApiServiceService){
    this.service.onRoleChange$
    .subscribe((res:any)=>{
      // this.currentRole = res;
    })
    this.service.onRole$
    .subscribe((res:any)=>{
      this.currentRole = res;
      console.log(res)
    })
  }

  formValue: any;

  onSave(){
    this.formValue = this.studentForm.value;
  }
}
