import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user/user.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);
  toasterService = inject(ToastrService);
  userService = inject(UserService);
  router = inject(Router)
  cartItems: any[] = [];
  userId: number = 0;
  cart = new Set<number>();
  cartItemCount = 0;
  users: any = {};
  cartItemCountSubject: any;

  @ViewChild('paymentModal') paymentModal!: ElementRef;

  ngOnInit(): void {
    var id = localStorage.getItem('id');
    console.log('Retrieved id from localStorage:', id);
    this.userId = Number(id);
    this.getCartDetails();
    this.getUserAddress(this.userId);
    this.cartService.cartItemCount$.subscribe((count) => {
      // this.cartItemCount = count;
    });

    this.cartService.updateCartItemCount();
  }

  paymentForm = new FormGroup({
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{16}$/),
    ]),
    expiryDate: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2}\/\d{2}$/),
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{3}$/),
    ]),
  });

  openPaymentModal() {
    const modalInstance = new bootstrap.Modal(this.paymentModal.nativeElement);
    this.paymentForm.reset();
    modalInstance.show();
  }

  closePaymentModal() {
    const modalInstance = bootstrap.Modal.getInstance(
      this.paymentModal.nativeElement
    );
    this.paymentForm.reset();
    modalInstance.hide();
  }

  onPaymentSubmit() {
    if (this.paymentForm.invalid) {
      this.toasterService.error('Please enter valid card details.');
      return;
    }

    const card = this.paymentForm.value;

    this.cartService.validateCard(card).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.toasterService.success('Payment successful');
          this.generateInvoice();
          this.clearCart();
          this.getCartDetails();
          this.closePaymentModal();

        } else {
          this.toasterService.error('Payment failed');
        }
      },
      error: (error) => {
        console.log(error);
        this.toasterService.error('Error processing payment');
      },
    });
  }

  userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
  Id = sessionStorage.getItem('id');
  invoiceData:any;
  generateInvoice() {
    var payload = {
      userId: this.userId,
      address: this.userData.address,
      state: this.userData.state,
      country: this.userData.country,
      zipCode: this.userData.zipCode,
      Items : this.cartItems.map((item) => {
        return {
          productCode: item.productCode,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        };
      }),
    };
    debugger;
    console.log('Payload for generating invoice:', payload);
    
    this.cartService.invoice(payload).subscribe({
      next:(res:any)=>{
        if(res.statusCode === 200){
          this.toasterService.success('Invoice generated successfully');
          console.log('Invoice generated successfully',res);
          this.invoiceData = res.data;
          this.invoiceData.localStorage.setItem('invoiceData', JSON.stringify(this.invoiceData));
          this.router.navigateByUrl('invoice')
          this.clearCart();
          this.getCartDetails();
        }else{
          this.toasterService.error('Failed to generate invoice');
        }
      },
      error:(error)=>{
        console.log(error);
        this.toasterService.error('Error generating invoice');
      }
    })
  }

  addItemToCart(item: any): void {
    this.cartService.addToCart(item);
  }

  removeItemFromCart(item: any): void {
    this.cartService.removeItemFromCart(item);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getCartDetails() {
    console.log('Fetching cart details for userId:', this.userId);
    this.cartService.getProductFromCart(this.userId).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          console.log('responseOnly', response.data);
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

  getUserAddress(data: any) {
    this.userService.getUserById(data).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.users = res.data;
          console.log('userAddress', this.users);
        } else {
          console.log(Error);
          this.toasterService.error('Failed to fetch user address');
        }
      },
      error: (error) => {
        console.log(error);
        this.toasterService.error('Error fetching user address');
      },
    });
  }

  increaseQuantity(item: any): void {
    const payload = {
      productId: item.productId,
      cartId: item.cartId,
      quantity: 1,
    };

    console.log('Payload for increasing quantity:', payload);

    this.cartService.incrementToCart(payload).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          console.log('Increment successful', res);

          this.getCartDetails();
          this.updateCartInLocalStorage();
          this.cartService.updateCartItemCount();
        } else {
          this.toasterService.error('Failed to increment quantity');
        }
      },
      error: (error) => {
        console.log(error);
        this.toasterService.error('Error incrementing quantity');
      },
    });
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;

      const payload = {
        cartId: item.cartId,
        productId: item.productId,
        quantity: 1,
      };

      console.log('Payload for decreasing quantity:', payload);

      this.cartService.decrementFromCart(payload).subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            console.log('Decrement successful', res);

            this.getCartDetails();
            this.updateCartInLocalStorage();
            this.cartService.updateCartItemCount();
          } else {
            this.toasterService.error('Failed to decrement item quantity');
          }
        },
        error: (error) => {
          console.log(error);
          this.toasterService.error('Error decrementing quantity');
        },
      });
    } else {
      this.toasterService.error('Quantity cannot be less than 1');
    }
  }

  removeCartFromLocalStorage(itemId: number): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      let cartArray = JSON.parse(storedCart);
      // Filter out the item with the specific cartId
      cartArray = cartArray.filter(
        (cartItem: any) => cartItem.cartId !== itemId
      );
      localStorage.setItem('cart', JSON.stringify(cartArray));
      this.cartService.updateCartItemCount();
    }
  }

  updateCartInLocalStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      let cartArray = JSON.parse(storedCart);

      cartArray = cartArray.map((item: any) => {
        const cartItem = this.cartItems.find(
          (cartItem) => cartItem.cartId === item.cartId
        );
        if (cartItem) {
          return {
            ...item,
            quantity: item.quantity,
          };
        }
        return item;
      });

      localStorage.setItem('cart', JSON.stringify(cartArray));
      this.cartItemCountSubject.next(cartArray.length);
    }
  }

  removeCartItemFromLocalStorage(item: any): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      let cartArray = JSON.parse(storedCart);
      console.log('Cart before removing', cartArray);

      cartArray = cartArray.filter(
        (cartItem: any) => cartItem.cartId !== item.cartId
      );

      localStorage.setItem('cart', JSON.stringify(cartArray));
      this.cart = new Set(cartArray);
      console.log('Cart after removing', cartArray);
    }
  }

  removeCartItem(cartId: any): void {
    console.log('cartId', cartId);
    const isConfirm = confirm(
      'Are you sure you want to remove this item from cart?'
    );
    if (isConfirm) {
      this.cartService.removeFromCart(cartId).subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            console.log('I am in remove', res);
            this.cartService.resetCartItemCount();
            // this.cartService.updateCartItemCount();
            // this.removeCartFromLocalStorage(cartId);
            // this.cartService.updateCartItemCount();
            this.getCartDetails();
            this.toasterService.success('Item removed from cart');
          } else {
            this.toasterService.error('Failed to remove item from cart');
          }
        },
        error: (error: Error) => {
          console.log(error);
          this.toasterService.error('Error removing item from cart');
        },
      });
    } else {
      console.log('Cancelled');
    }
  }
}