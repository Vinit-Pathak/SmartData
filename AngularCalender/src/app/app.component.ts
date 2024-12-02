import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,MatNativeDateModule,MatCardModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularCalender';

  
  selectedDate: Date | null = null;
  hoverMessage: string | null = null;

  
  specialDates: any = {
    '2024-11-15': 'Special Event on this day!',
    '2024-12-25': 'Christmas Day!',
  };

  // Handle the hover event on a date
  onDateHover(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const date = target?.textContent?.trim();

    if (date && this.specialDates[`2024-11-${date}`]) {
      this.hoverMessage = this.specialDates[`2024-11-${date}`];
    } else {
      this.hoverMessage = null;
    }
  }

  // Handle the date selection via 'selectedChange' event
  onDateSelected(date: Date): void {
    this.selectedDate = date;
    console.log('Date selected:', date);
  }

  // Handle month selection
  onMonthSelected(month: number): void {
    console.log('Month selected:', month);
  }

  // Handle year selection
  onYearSelected(year: number): void {
    console.log('Year selected:', year);
  }
}
