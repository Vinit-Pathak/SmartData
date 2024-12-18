import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  http = inject(HttpClient);

  createOrder(amount:number){
    return this.http.post(`https://localhost:7053/api/RazorPay/createOrder`, amount)
  }

  verifyPayment(paymentId: string, orderId: string){
    return this.http.post(`https://localhost:7053/api/RazorPay/verify-payment`, {paymentId, orderId})
  }
}
