import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoiceData: any;
  userData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.invoiceData = JSON.parse(localStorage.getItem('invoiceData') || '{}');
    this.userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

    if (!this.invoiceData || Object.keys(this.invoiceData).length === 0) {
      // Redirect to cart if no invoice data exists
      this.router.navigate(['/cart']);
    }
  }

  downloadInvoice(): void {
    const element = document.createElement('a');
    const invoiceDetails = JSON.stringify(this.invoiceData, null, 2);
    const file = new Blob([invoiceDetails], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `invoice_${this.invoiceData.invoiceId}.json`;
    element.click();
  }
}
