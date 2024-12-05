import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  http = inject(HttpClient);
  constructor(){
    this.updateCartItemCount();
  }

  addToCart(data:any):Observable<any>{
    return this.http.post('https://localhost:7053/api/Cart/addToCart',data);
  }

  getProductFromCart(prId: number): Observable<any> {
    return this.http.get(`https://localhost:7053/api/Cart/getCartDetails/${prId}`);
  }

  incrementToCart(quantity: any):Observable<any>{
    return this.http.post(`https://localhost:7053/api/Cart/incrementcart`,quantity);
  }

  removeFromCart(cartId: number):Observable<any>{
    return this.http.delete(`https://localhost:7053/api/Cart/removeFromCart/${cartId}`);
  }

  decrementFromCart(payload: any): Observable<any> {
    return this.http.post(`https://localhost:7053/api/Cart/decrementFromCart`, payload);
  }
  
  validateCard(data:any):Observable<any>{
    return this.http.post('https://localhost:7053/api/Cart/validateCard',data);
  }

  invoice(data:any):Observable<any>{
    return this.http.post('https://localhost:7053/api/Invoice/generateInvoice',data);
  }


  private cartItemCountSubject = new BehaviorSubject<number>(0);

  cartItemCount$ = this.cartItemCountSubject.asObservable();

  updateCartItemCount(): void {
    const storedCart = localStorage.getItem('cart');
    const cartArray = storedCart ? JSON.parse(storedCart) : [];
    this.cartItemCountSubject.next(cartArray.length); 
  }

  addItemToCart(item: any): void {
    const storedCart = localStorage.getItem('cart');
    let cartArray = storedCart ? JSON.parse(storedCart) : [];
    cartArray.push(item); 
    localStorage.setItem('cart', JSON.stringify(cartArray)); 
    this.updateCartItemCount(); 
  }

  removeItemFromCart(itemToRemove: any): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      let cartArray = JSON.parse(storedCart);
      cartArray = cartArray.filter(
        (item: any) => item.cartId !== itemToRemove.cartId
      ); 
      localStorage.setItem('cart', JSON.stringify(cartArray)); 
      this.updateCartItemCount(); 
    }
  }


  clearCart(): void {
    localStorage.removeItem('cart');
    this.updateCartItemCount(); 
  }


}
