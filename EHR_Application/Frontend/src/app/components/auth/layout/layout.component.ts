import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  showWelcomeMessage = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showWelcomeMessage = false;  
      }
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/') {
          this.showWelcomeMessage = true;  
        }
      }
    });
  }
}
