import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../others/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription!: Subscription;

  constructor(private loaderService:LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.isLoading.subscribe(
      (Loading) => {
        this.isLoading = Loading;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}