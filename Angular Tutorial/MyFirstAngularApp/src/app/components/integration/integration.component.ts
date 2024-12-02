import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-integration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './integration.component.html',
  styleUrl: './integration.component.scss'
})
export class IntegrationComponent {
  empList: any[]= [];
  constructor(private http:HttpClient, private service: ApiServiceService){
    
  }
  

  getEmps(){
    debugger;
    this.service.getData().subscribe((res:any)=>{
      this.empList = res; 
    })
  }
}
