import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  http = inject(HttpClient);

  addToCart(data:any):Observable<any>{
    return this.http.post('https://localhost:7053/api/Cart/addToCart',data);
  }

  getProductFromCart(prId: any): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Cart/getCartDetails/${prId}`);
  }
}
