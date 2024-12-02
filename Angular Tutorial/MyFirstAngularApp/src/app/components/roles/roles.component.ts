import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRole } from '../../model/class/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {



  dataList: IRole[] = [];
  // this is new method of DI
  http = inject(HttpClient);

  // Depedency Injection old method
  // constructor(private http: HttpClient){

  // }
  ngOnInit(): void {
    this.getData();
  }

  // getData(){
  //   this.http.get("https://datausa.io/api/data?drilldowns=Nation&measures=Population").subscribe((res: any)=>{
  //     this.dataList = res.data;
  //   })
  // }


  getData() {
    console.log('Fetching data from API...');
    this.http.get("https://datausa.io/api/data?drilldowns=Nation&measures=Population").subscribe({
      next: (res: any) => {
        console.log('API response:', res);
        this.dataList = res.data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetching complete');
      }
    });
  }










  // fullName:string = "Vinit Pathak"
  // age: number = 23
  // currentDate: Date = new Date();
  // radio: string = "radio"
  // checkbox: string = "checkbox"
  // selectedState: string = ''
  //myClassName: string = "bg-danger"

  // showWelcomeAlert(){
  //   alert("Welcome to the Blog!");
  // }

  //signal
  Name = signal("Harsh Raikwad");

  changeName(){
    this.Name.set("Prajak Dhusiya") 
  }
  // showMessageAlert(message: string){
  //   alert(message);
  // }
}
