import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../service/product/product.service';
import { CartService } from '../../service/cart/cart.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
})
export class CustomerDashboardComponent {

  products:any[] = [];
  userId:any;
  quantity: number = 1;
  productId?: number = 0;
  cartItemList:number[] = [];

  productService = inject(ProductService);
  toasterService = inject(ToastrService);
  cartService = inject(CartService);

  @ViewChild('productDetailsModal') productDetailsModal!: ElementRef;

  ngOnInit() {
    this.getAllProducts();
    this.loadCartFromLocalStorage();
    this.userId = localStorage.getItem('id');
    console.log("UserID : ",this.userId);
    this.cartService.cartItemCount$.subscribe({
      next:(res:any)=>{
        this.cartItemList = res;
      }
    })
  }

  isExistInCart(productId:number):boolean{
    console.log(this.cartItemList.includes(productId));
    
    return this.cartItemList.includes(productId);
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res;
        console.log(this.products)
      },
      error: (err: any) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  addToCart(prodId:number){
    const payload = {
      productId: prodId,
      userId: Number(this.userId),
      quantity: 1,
    };
    console.log(payload);
    debugger;
    if (this.cart.has(prodId)) {
      this.toasterService.error('Item is already in the cart', 'Error', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true}
      );
      return;
    }

    this.cartService.addToCart(payload).subscribe({
      next: (res: any) => {
        if(res.statusCode == 200){
          this.cartService.resetCartItemCount()
          this.cart.add(prodId);
          // this.updateCartInLocalStorage();
        }else{
          this.toasterService.error('Error while adding the item','Error', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: true
          });
        }
      },
      error: (err: any) => {
        console.error('Error adding to cart:', err);
        this.toasterService.error('Error while adding the item','Error', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true
        });
      }
    })
  }

  cart = new Set<number>();
  isProductInCart(productId: number): boolean {
    return this.cart.has(productId);
  }

  updateCartInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart)));
  }


  loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = new Set(JSON.parse(storedCart));
    }
  }

  
}
