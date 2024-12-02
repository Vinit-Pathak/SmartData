import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ifelse',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ifelse.component.html',
  styleUrl: './ifelse.component.scss'
})
export class IfelseComponent {

  isDivVisible: boolean = true;
  isToggle: boolean = false;
  text1 : string ='';
  text2 : string ='';
  selectedStatus: string = '';


  showDiv1(){
    this.isDivVisible = true;
  }
  hideDiv1(){
    this.isDivVisible = false;
  }

  toggleDiv2(){
    this.isToggle = !this.isToggle;
  }
}
