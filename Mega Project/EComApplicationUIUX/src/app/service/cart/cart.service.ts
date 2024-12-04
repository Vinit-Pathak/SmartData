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


  private cartItemCountSubject = new BehaviorSubject<number>(0);
  // Expose the cart item count as an observable
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  updateCartItemCount(): void {
    const storedCart = localStorage.getItem('cart');
    const cartArray = storedCart ? JSON.parse(storedCart) : [];
    this.cartItemCountSubject.next(cartArray.length); // Emit the updated count
  }

  addItemToCart(item: any): void {
    const storedCart = localStorage.getItem('cart');
    let cartArray = storedCart ? JSON.parse(storedCart) : [];
    cartArray.push(item); // Add the new item
    localStorage.setItem('cart', JSON.stringify(cartArray)); // Save to localStorage
    this.updateCartItemCount(); // Update the count
  }

  removeItemFromCart(itemToRemove: any): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      let cartArray = JSON.parse(storedCart);
      cartArray = cartArray.filter(
        (item: any) => item.cartId !== itemToRemove.cartId
      ); // Remove by cartId
      localStorage.setItem('cart', JSON.stringify(cartArray)); // Save to localStorage
      this.updateCartItemCount(); // Update the count
    }
  }

  // Clear the cart completely
  clearCart(): void {
    localStorage.removeItem('cart');
    this.updateCartItemCount(); // Set count to 0 after clearing the cart
  }


}
