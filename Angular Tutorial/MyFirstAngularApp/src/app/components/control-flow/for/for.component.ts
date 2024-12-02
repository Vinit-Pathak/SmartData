import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-for',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './for.component.html',
  styleUrl: './for.component.scss'
})
export class ForComponent {
  animeArr: string[] = ['Naruto','Itachi','Hinata','Tanjiro'];
  dayNum : string ='';
  studentList : any[] = [
    {studId:1, totalMarks: 45, name:'AAA', city: 'Pune',   isActive:  false},
    {studId:2, totalMarks: 30, name:'BBB', city: 'Mumbai', isActive:  false},
    {studId:3, totalMarks: 80, name:'CC', city: 'Delhi', isActive:  true},
    {studId:4, totalMarks: 65, name:'DD', city: 'Goa', isActive:  false},
    {studId:5, totalMarks: 75, name:'EE', city: 'Nagpur', isActive:  false},
    {studId:6, totalMarks: 90, name:'FFF', city: 'Thane', isActive:  true},
  ];
}
