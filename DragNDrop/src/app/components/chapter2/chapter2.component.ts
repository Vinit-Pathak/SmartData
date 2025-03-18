import { Component } from '@angular/core';
import { BoxService, Box } from '../../services/box.service';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chapter2',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './chapter2.component.html',
  styleUrl: './chapter2.component.css'
})
export class Chapter2Component {

  constructor(public boxService: BoxService) {}

  drop(event: CdkDragDrop<Box[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
