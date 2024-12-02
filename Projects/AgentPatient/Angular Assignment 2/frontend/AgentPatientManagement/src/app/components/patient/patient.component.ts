import { Component, inject, OnInit } from '@angular/core';
import { AgentServiceService } from '../../services/agent-service/agent-service.service';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryStateServiceService } from '../../services/country-state-service/country-state-service.service';
// import { Patient } from '../../modals/Patient';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../services/user/user-service.service';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, CommonModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {
  


  agentEmail: any = localStorage.getItem("email");
  encodedAgentEmail = encodeURIComponent(this.agentEmail);
  router = inject(Router)
  toaster = inject(ToastrService)
  patientService = inject(AgentServiceService);
  countryStateService: any = inject(CountryStateServiceService);
  agentService = inject(UserServiceService)
  formValue: any;
  agentDetails: any = [];
  allPatient: any[] = [];
  agentId: any = null;
  editData: any;
  updatedMode: boolean = false;
  todayDate=new Date().toISOString().split('T')[0];

  ngOnInit() {
    this.resetForm();
    this.getAgentDetails();
    this.getAllCountry();
    // this.loadState();
  }

  patientForm: FormGroup = new FormGroup({
    pId: new FormControl(0),
    patientId: new FormControl(0),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', Validators.required) ,
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    country: new FormControl(0, Validators.required),
    state: new FormControl(0, Validators.required),
    postalCode: new FormControl('', Validators.required),
    currentMedications: new FormControl('', Validators.required),
    bloodType: new FormControl('', Validators.required) ,
    nextAppointmentDate: new FormControl('', Validators.required),
    reasonForVisit: new FormControl('', Validators.required),
    allergies: new FormControl('', Validators.required),
    hasAgreeToTerms: new FormControl(false, Validators.required),
    isPatientActive: new FormControl(false, Validators.required),
      aId: new FormControl(0)
  });

  resetForm() {
    this.patientForm.reset({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      phoneNumber: '',
      address: '',
      state: 0,
      country: 0,
      postalCode: '',
      bloodType: '',
      currentMedications: '',
      nextAppointmentDate: new Date(),
      reasonForVisit: '',
      allergies: '',
      hasAgreeToTerms: true,
      isPatientActive: true,
      aId: 0
    });
  }


  openModal(){
    const modal = document.getElementById('myModal')
    if(modal != null){
      modal.style.display = "block";
    }
  }
  closeModal(){
    this.patientForm;
    const modal = document.getElementById('myModal')
    if(modal != null){
      modal.style.display = "none";
    }
  }

  onSubmit() {
    if(this.patientForm.invalid){
          alert("Please enter all fields");
          return;
        }
        this.formValue = this.patientForm.value;
        // console.log(this.patientForm.value,"value");
        // console.log(this.formValue,"test");
        if(this.updatedMode){
          this.onUpdate(this.formValue);
        } else {
          this.formValue = this.patientForm.value; //optional
          this.formValue.aId = this.agentDetails.aId 
          this.addPatients(this.formValue);
        }
  }

  onEdit(patient: any){ 
      this.editData = {...patient};
      console.log(this.editData)
      this.updatedMode = true;
      this.openModal();
      const formattedPatient = {
        ...patient,
        dateOfBirth: new DatePipe('en-US').transform(patient.dateOfBirth, 'yyyy-MM-dd'),
        nextAppointmentDate: new DatePipe('en-US').transform(patient.nextAppointmentDate, 'yyyy-MM-dd')
      };
      this.patientForm.patchValue(formattedPatient);
      this.loadState(patient.country); 
    } 
  onAdd() {
    this.updatedMode = false;
    this.resetForm();
    this.openModal();
  }
  async getAgentDetails(){
    this.agentService.getUser(this.agentEmail).subscribe({
      next: (res: any) => {
        this.agentDetails = res
        this.agentId = res.aId
        this.getPatients()
      },
      error: (error: any) => {
        alert("I am in error")
        console.log(error)
      }
    })
  }


  getPatients() {

    this.patientService.getAllPatients(this.agentId).subscribe({
      next: (res: any) => {
        this.allPatient = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  addPatients(Patient: any) {
    this.patientService.addPatient(Patient).subscribe({
      next: (res) => {
        this.toaster.success("Patient added successfully", "Success",{timeOut:3000, closeButton:true})
        this.getPatients();
        this.resetForm();
        this.closeModal();
        // alert(res.message)
      },
      error: (error) => {
        alert(JSON.stringify(error));
        this.toaster.error('Error While Adding Patient', 'Error',{timeOut:3000, closeButton:true});
      },
    });
  }

  //try this
  // onUpdate(formData: any) {
  //   this.patientService.updatePatientById(formData, formData.aId).subscribe({
  //     next: (res) => {
  //       this.toaster.success('Patient Updated Successfully', 'success',{timeOut:3000, closeButton:true});
  //       this.updatedMode = false;
  //       this.resetForm();
  //       this.getPatients();
  //       this.closeModal();
  //     },
  //     error: (error) => {
  //       this.toaster.error('Error While Updating Patient', 'Error',{timeOut:3000, closeButton:true});
  //     }
  //   });
  // }

  onUpdate(formData: any)  {
    this.formValue = formData
  //  console.log(formData,"update")
    let  aid = formData.aId;
    // console.log(this.formValue)
    this.patientService.updatePatientById(this.formValue, aid).subscribe({
      next: (res) => {
        this.toaster.success('Patient Updated Successfully','Updated',{timeOut:3000, closeButton:true});
        // alert("Updation Successful")
        this.updatedMode = false;
        this.resetForm();
        this.getPatients();
        this.closeModal();
      },
      error: (error) => {
        // alert("Updation Unsuccessful")
        this.toaster.error('Error While Updating Patient', 'Error',{timeOut:3000, closeButton:true});
      },
    });
  }

  onDelete(id: number){
    const isConfirmed = confirm('Are you sure you want to delete this employee');
    if(isConfirmed){
      this.patientService.deletePatientById(id).subscribe((res)=>{
        this.toaster.error("Patient Deleted Successfully", 'Deleted',{timeOut:3000, closeButton:true});
        this.getPatients();
      })
    }
  }

  allCountry : any [] = []


  getAllCountry(){
    this.countryStateService.getAllCountry().subscribe({
      next : (res: any) => {
        this.allCountry = res
        // console.log(this.allCountry)
      },
      error : (error: any) =>{
        alert("I am in error")
      }
      
    })
  }


  allState : any [] = []

  allStateByCountryId: any[] = []


  loadState(countryId: number){
    this.countryStateService.getStateByCountryId(countryId).subscribe((data: any)=>{
          this.allState = data;
          // console.log(data)
          // Set the selected state in the form
          if (this.editData) {
            this.patientForm.patchValue({
              state: this.editData.state
            });
          }
        });
  }

  onChange(countrId : any){
    // console.log(countrId)
    this.countryStateService.getStateByCountryId(countrId).subscribe({
      next : (res:any) => {
        this.allStateByCountryId = res
      },
      error : (error: any) => {
        console.log("I am in error")
      }
    })
  }




  getCountryName(countryId: number): string {
    const country = this.allCountry.find(c => c.countryId === countryId);
    return country ? country.name : 'Not Found';
  }

  getStateName(stateId: number): string {
    const state = this.allState.find(s => s.stateId === stateId);
    return state ? state.name : 'Not Found';
  }






}
