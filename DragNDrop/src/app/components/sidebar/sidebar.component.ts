import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BoxService, Box } from '../../services/box.service';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, DragDropModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  dropZoneData: Box[] = [];

  constructor(public boxService: BoxService) {}

  drop(event: CdkDragDrop<Box[]>, targetChapter: string) {
    console.log('Sidebar drop event:', event, 'target:', targetChapter);
    const box = event.item.data;
    this.boxService.moveBox(box, targetChapter);
    console.log(
      'After move, Chapter1:',
      this.boxService.chapter1Boxes,
      'Chapter2:',
      this.boxService.chapter2Boxes
    );
  }
}
