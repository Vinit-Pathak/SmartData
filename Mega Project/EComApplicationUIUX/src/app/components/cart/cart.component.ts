import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService);
  toasterService = inject(ToastrService);
  userService = inject(UserService)
  cartItems: any[] = [];
  userId:number = 0;
  cart = new Set<number>()
  cartItemCount = 0;
  users:any = {};


  ngOnInit(): void {
    var id = localStorage.getItem('id');
    console.log('Retrieved id from localStorage:', id);
    this.userId = Number(id);
    this.getCartDetails();
    this.getUserAddress(this.userId)
    this.cartService.cartItemCount$.subscribe((count)=>{
      this.cartItemCount = count;
    })

    this.cartService.updateCartItemCount();
  }

  addItemToCart(item: any): void {
    this.cartService.addToCart(item)
  }

  removeItemFromCart(item: any): void{
    this.cartService.removeItemFromCart(item)
  }

  clearCart(){
    this.cartService.clearCart()
  }

  getCartDetails() {
    console.log('Fetching cart details for userId:', this.userId);
    this.cartService.getProductFromCart(this.userId).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          console.log('responseOnly', response);
          this.cartItems = response.data;
          console.log('cartResponse', this.cartItems);
        } else {
          this.toasterService.error('Failed to fetch cart items');
        }
      },
      (error) => {
        this.toasterService.error('Error fetching cart items');
      }
    );
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getUserAddress(data:any){
    this.userService.getUserById(data).subscribe({
      next:(res:any)=>{
        if(res.statusCode === 200){
          this.users = res.data;
          console.log('userAddress', this.users);
        }else{
          console.log(Error);
          this.toasterService.error('Failed to fetch user address');
        }
      },
      error:(error)=>{
        console.log(error);
        this.toasterService.error('Error fetching user address');
    }})
  }

  increaseQuantity(item: any): void {
    const payload = {
      productId : item.productId,
      cartId: item.cartId,
      quantity: 1
    }
    console.log('Payload', payload);
    this.cartService.incrementToCart(payload).subscribe({
      next:(res:any)=>{
        if(res.statusCode === 200){
          console.log('response', res);
          this.getCartDetails();
          this.updateCartInLocalStorage();
          this.cartService.updateCartItemCount();
        }else{
          this.toasterService.error('Failed to increment quantity');
        }
      },
      error:(error)=>{
        console.log(error);
        this.toasterService.error('Error incrementing quantity');
      }
    })
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartInLocalStorage(); // Update local storage immediately
      this.cartService.updateCartItemCount(); // Update cart count
      this.getCartDetails();
    }
  }

  removeCartFromLocalStorage(): void {
    localStorage.removeItem('cart');
  }

  updateCartInLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart)));
  }

  removeCartItemFromLocalStorage(item: any): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      let cartArray = JSON.parse(storedCart);
      console.log("Cart before removing", cartArray);
      
      // Use cartId to remove specific item
      cartArray = cartArray.filter((cartItem: any) => cartItem.cartId !== item.cartId);
      
      localStorage.setItem('cart', JSON.stringify(cartArray));
      this.cart = new Set(cartArray); // Update the cart set
      console.log("Cart after removing", cartArray);
    }
  }
  

  removeCartItem(cartId: any): void {
    console.log("cartId", cartId);
    debugger
    const isConfirm = confirm('Are you sure you want to remove this item from cart?');
    if (isConfirm) {
      this.cartService.removeFromCart(cartId).subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            console.log("I am in remove",res);
            
            this.removeCartFromLocalStorage();
            this.cartService.updateCartItemCount();
            this.getCartDetails();
            this.toasterService.success('Item removed from cart');
          } else {
            this.toasterService.error('Failed to remove item from cart');
          }
        },
        error: (error: Error) => {
          console.log(error);
          this.toasterService.error('Error removing item from cart');
        }
      });
    } else {
      console.log('Cancelled');
    }
  }
  

}
