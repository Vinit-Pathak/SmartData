import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../../services/api-service.service';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule,JsonPipe,CommonModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss'
})
export class TemplateFormComponent {
  studentObj:any={
    FirstName:'',
    LastName:'',
    UserName:'',
    City:'',
    State:'',
    ZipCode:'',
    isAcceptTerms:false
  }

  formValue:any;

  onSubmit(){
    this.formValue=this.studentObj;
    console.log(this.formValue);
  }

  onReset(){
    this.studentObj={
      FirstName:'',
      LastName:'',
      UserName:'',
      City:'',
      State:'',
      ZipCode:'',
      isAcceptTerms:false 
    }
    this.formValue=false;
  }

  currentRole:any='';
  constructor(private service:ApiServiceService){
    this.service.onRoleChange$
    .subscribe((res:any)=>{
      // this.currentRole=res;
    })
    this.service.onRole$
    .subscribe((res:any)=>{
      this.currentRole=res;
      console.log(res);
    })
  }
}
