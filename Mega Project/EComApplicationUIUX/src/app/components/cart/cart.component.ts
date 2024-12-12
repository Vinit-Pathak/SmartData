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
import { CountryStateService } from '../../service/countryState/country-state.service';
import Swal from 'sweetalert2';
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
  countryStateService = inject(CountryStateService);
  router = inject(Router)
  cartItems: any[] = [];
  userId: number = 0;
  cart = new Set<number>();
  cartItemCount = 0;
  users: any = {};
  invoiceData: any[] = [];
  cartItemCountSubject: any;
  imgURL: string = ''

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
    this.getAllCountry()
    var data = JSON.parse(localStorage.getItem('userData') || '{}');
    this.imgURL = data.profileImage;
    this.sanitizeField('expiryDate')
  }

  paymentForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
    expiryDate: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-1][0-9]\/\d{2}$/),
    ]),
    cvv: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{3}$')]),
  });

  sanitizeField(field: string) {
    this.paymentForm.get(field)?.valueChanges.subscribe((value) => {
      const sanitizedValue = value.replace(/[^0-9/]/g, '');
      const limitedValue = sanitizedValue.slice(0, 5);

      if (limitedValue !== value) {
        this.paymentForm.get(field)?.setValue(limitedValue);
      }
    });
  }

  addressForm: FormGroup = new FormGroup({
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150),
      Validators.pattern(/^[a-zA-Z0-9\s,.-]+$/),
    ]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{6}$/),
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    state: new FormControl(0, [Validators.required]),
    country: new FormControl(0, [Validators.required]),
  });

  openAddressPopup() {
    if (this.users.address) {
      this.addressForm.patchValue({
        address: this.users.address,
        zipCode: this.users.zipCode,
        country: this.users.country,
        state: this.users.state,
      });
    }

    this.getState(this.users.country);
    // Show the modal by adding the class
    const modal = document.getElementById('addressModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  addressData: any;
  saveAddress() {
    this.addressData = this.addressForm.value;
    this.closeAddressModal('addressModal');
    this.openPaymentModal();
  }

  closeAddressModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  allCountry: any[] = [];

  getAllCountry() {
    this.countryStateService.getAllCountry().subscribe({
      next: (res: any) => {
        this.allCountry = res;
      },
      error: (error: any) => {
        alert('I am in error');
      },
    });
  }

  allState: any[] = [];
  getState(countrId: any) {
    this.countryStateService.getStateByCountryId(countrId).subscribe({
      next: (res: any) => {
        this.allState = res;
      },
      error: (error: any) => {
        alert('I am in error');
      },
    });
  }

  onKeyPress(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); 
    }
  }

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
    if(this.paymentForm.valid){
      const expiryDate = this.paymentForm.get('expiryDate')?.value;
      const formattdExpiryDate = new Date (
        expiryDate + 'T00:00:00.000Z'
      ).toISOString();

      const payload = {
        cardNumber: this.paymentForm.get('cardNumber')?.value,
        expiryDate: formattdExpiryDate,
        cvv: this.paymentForm.get('cvv')?.value,
        userId: this.users.id,
        zipCode: this.addressData.zipCode,
        address: this.addressData.address,
        state: this.addressData.state,
        country: this.addressData.country,
      }

      console.log('Payload for validating card:', payload);

      this.cartService.validateCard(payload).subscribe({
        next:(res:any)=>{
          if(res.statusCode == 200){
            console.log("Payment", res);
            this.cartService.resetCartItemCount();
            this.toasterService.success('Payment successful');

            this.closePaymentModal();
            this.router.navigateByUrl(`/invoice/${res.data.salesId}`)
            this.paymentForm.reset();
          }else{
            this.toasterService.error(res.message)
          }
        },
        error:(error)=>{
          console.log(error);
          this.toasterService.error('Error processing payment');
        }
      })
      
    }else{
      this.paymentForm.markAllAsTouched()
    }
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
          // console.log('Increment successful', res);

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


  confirmDeletion(productId: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the delete operation
        this.removeCartItem(productId);
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Your item is safe.', 'info');
      }
    });
  }

  removeCartItem(cartId: any): void {
  
      this.cartService.removeFromCart(cartId).subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            console.log('I am in remove', res);
            this.cartService.resetCartItemCount();
            this.getCartDetails();
          } else {
            this.toasterService.error('Failed to remove item from cart');
          }
        },
        error: (error: Error) => {
          console.log(error);
          this.toasterService.error('Error removing item from cart');
        },
      });
  }
  
  }

