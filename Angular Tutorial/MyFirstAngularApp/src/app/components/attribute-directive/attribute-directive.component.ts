import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-attribute-directive',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './attribute-directive.component.html',
  styleUrl: './attribute-directive.component.scss'
})
export class AttributeDirectiveComponent {
  div1BgColor: string = 'bg-danger'
  isDivActive: boolean = false

  text1: string = ''
  text2: string = ''

  isCheecked: boolean = false
  selectedState: string = ''

  constructor(private router:Router){

  }

  studentList : any[] = [
    {studId:1, totalMarks:23, gender:'male', name:'AAA', city: 'Pune',   isActive:  false},
    {studId:2, totalMarks:43, gender:'female', name:'BBB', city: 'Mumbai', isActive:  false},
    {studId:3, totalMarks:54, gender:'male', name:'CC', city: 'Delhi', isActive:  true},
    {studId:4, totalMarks:64, gender:'male', name:'DD', city: 'Goa', isActive:  false},
    {studId:5, totalMarks:77, gender:'female', name:'EE', city: 'Nagpur', isActive:  false},
    {studId:6, totalMarks:89, gender:'male', name:'FFF', city: 'Thane', isActive:  true},
  ];
background: any;

  addRedClass() {
    this.div1BgColor = 'bg-danger'
  }
  addBlueClass(){
    this.div1BgColor = 'bg-primary'
  }

  toggleDiv(){
    this.isDivActive = !this.isDivActive
  }

  navigateToStructural(){
    this.router.navigateByUrl("structural-dir")
  }
}
