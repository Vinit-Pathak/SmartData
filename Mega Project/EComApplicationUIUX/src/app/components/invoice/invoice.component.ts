import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../service/loader/loader.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  id?: number;
  invoice: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private toaster: ToastrService,
    private loader: LoaderService
  ){}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');
    this.GenerateInvoice();
  }

  GenerateInvoice(){
    this.cartService.invoice(Number(this.id)).subscribe({
      next: (res: any) => {
        if(res.statusCode == 200){
          this.invoice = res.invoice;
          console.log("Invoice Data: ",res);
        }else{
          this.toaster.error("Unable to generate invoice");
        }
      },
      error: (err: any) => {
        console.error('Error fetching invoice:', err);
      }
    });
  }


  downloadPDF(): void {
    const invoiceElement = document.getElementById('invoice-details'); 

    if (invoiceElement) {
      
      const printButton = document.querySelector('.btn-print');
      const exportButton = document.querySelector('.btn-export');
      if (printButton) printButton.setAttribute('style', 'display: none');
      if (exportButton) exportButton.setAttribute('style', 'display: none');

      html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
        
        if (printButton) printButton.removeAttribute('style');
        if (exportButton) exportButton.removeAttribute('style');

        const imgData = canvas.toDataURL('image/png'); 
        const doc = new jsPDF('p', 'mm', 'a4'); 

        const imgWidth = 190; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); 
        doc.save('invoice.pdf');
      });
    }
  }
}
