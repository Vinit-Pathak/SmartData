import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiServiceService } from './services/api-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MyFirstAngularApp';
  constructor(private service: ApiServiceService){}
  selectedRole:string ='';
  onRoleChange(role:any){
    this.service.onRoleChange$.next(role)
    this.service.onRole$.next(role)
  }
}
