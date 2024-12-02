import { AsyncPipe, DatePipe, JsonPipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, map, Observable } from 'rxjs';
import { NaPipe } from '../../../pipe/na.pipe';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [FormsModule, AsyncPipe, DatePipe, NaPipe, UpperCasePipe, LowerCasePipe, TitleCasePipe, JsonPipe],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})
export class SwitchComponent {
  dayNum: string ='';

  student: any ={
    name: 'John Doe',
    age: 25,
    grade: 'A',
    subject: 'Maths'
  }

  text: string = 'Virat is a goat player';
  currentDate: Date = new Date();
  currentTime : Observable<Date> = new Observable<Date>;

  constructor(){
    this.currentTime = interval(1000).pipe(map(() => new Date()))
  }
}
