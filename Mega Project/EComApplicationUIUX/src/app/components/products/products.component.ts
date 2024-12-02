import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../service/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products:any[]=[];
  role=sessionStorage.getItem('role')
  isUpdating=false;
  
  productService=inject(ProductService)
  toastr=inject(ToastrService)
  // admin=inject(AuthService)
  ngOnInit(){
      this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err: any) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  updateForm = new FormGroup({
    id: new FormControl(0),
    productName: new FormControl('', Validators.required),
    productCode: new FormControl('', Validators.required),
    category:new FormControl('',Validators.required),
    brand: new FormControl('', Validators.required),
    sellingprice: new FormControl(0, Validators.required),
    purchasePrice: new FormControl(0, Validators.required),
    purchaseDate: new FormControl('', Validators.required),
    stock: new FormControl(0, Validators.required),
    



  })

  formValue:any
  onEdit(product: any) {
      this.isUpdating = true;
      this.formValue = this.updateForm.value
      this.updateForm.patchValue(this.formValue); 
  }


  onDelete(id: number) {
    const isConfirmed = confirm('Are you sure you want to delete this employee');
    if (isConfirmed) {
      this.productService.deleteProduct(id).subscribe({
        next: (res:any) => {
          this.toastr.error("User Deleted Successfully", 'Deleted', { timeOut: 3000, closeButton: true });
          this.getAllProducts();
        },
        error: (err:any) => {
          console.error('Error deleting user:', err);
        }
      });
    }
  }

  onUpdate() {
    this.productService.updateProduct(this.updateForm.value).subscribe({
      next: (res:any) => {
        if (res) {
          this.toastr.success("User Updated Successfully");
          this.isUpdating = !this.isUpdating;
          this.getAllProducts();
        }
      },
      error: (err:any) => {
        console.error('Error updating user:', err);
      }
    });
  }

  OnBack(){
    this.isUpdating=false
  }
}
