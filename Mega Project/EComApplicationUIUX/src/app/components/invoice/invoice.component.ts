import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterLink],
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
    console.log('Invoice Data:', this.invoiceData); 
    if (!this.invoiceData || Object.keys(this.invoiceData).length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  downloadInvoice(): void {
    const element = document.createElement('a');
    const invoiceDetails = JSON.stringify(this.invoiceData, null, 2);
    const file = new Blob([invoiceDetails], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `invoice_${this.invoiceData.invoiceId}.pdf`;
    element.click();
  }
}
