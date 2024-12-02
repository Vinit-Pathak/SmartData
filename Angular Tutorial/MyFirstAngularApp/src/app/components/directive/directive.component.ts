import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-directive',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './directive.component.html',
  styleUrl: './directive.component.scss'
})
export class DirectiveComponent {
  isDivVisible:boolean = true;
  isToggle:boolean = true;

  text1: string = '';
  text2: string = '';

  isActive:boolean = false;
  selectedState:string = '';

  cityArr: string[] = ['Nagpur','Pune','Mumbai','Delhi'];
  animeArr: string[] = ['Naruto','Itachi','Hinata','Tanjiro'];

  studentList : any[] = [
    {studId:1, name:'AAA', city: 'Pune',   isActive:  false},
    {studId:2, name:'BBB', city: 'Mumbai', isActive:  false},
    {studId:3, name:'CC', city: 'Delhi', isActive:  true},
    {studId:4, name:'DD', city: 'Goa', isActive:  false},
    {studId:5, name:'EE', city: 'Nagpur', isActive:  false},
    {studId:6, name:'FFF', city: 'Thane', isActive:  true},
  ];

  showDiv(){
    this.isDivVisible = true;
  }
  hideDiv(){
    this.isDivVisible = false;
  }

  toggle(){
    this.isToggle = !this.isToggle;
  }
}
