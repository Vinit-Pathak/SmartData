import { Injectable } from '@angular/core';


export interface Box {
  id: number;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  chapter1Boxes: Box[] = [
    { id: 1, content: 'Box 1 - Chapter 1' },
    { id: 2, content: 'Box 2 - Chapter 1' },
    { id: 3, content: 'Box 3 - Chapter 1' },
    { id: 4, content: 'Box 4 - Chapter 1' }
  ];
  chapter2Boxes: Box[] = [
    { id: 5, content: 'Box 1 - Chapter 2' },
    { id: 6, content: 'Box 2 - Chapter 2' },
    { id: 7, content: 'Box 3 - Chapter 2' },
    { id: 8, content: 'Box 4 - Chapter 2' }
  ];

  moveBox(box: Box, targetChapter: string) {
    if (targetChapter === 'chapter1') {
      this.chapter2Boxes = this.chapter2Boxes.filter(b => b.id !== box.id);
      this.chapter1Boxes.push(box);
    } else if (targetChapter === 'chapter2') {
      this.chapter1Boxes = this.chapter1Boxes.filter(b => b.id !== box.id);
      this.chapter2Boxes.push(box);
    }
  }
}
