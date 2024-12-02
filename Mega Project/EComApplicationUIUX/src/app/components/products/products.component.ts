import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../service/product/product.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  role = sessionStorage.getItem('role');
  isUpdating = false;
  isAdding = false;

  productService = inject(ProductService);
  toastr = inject(ToastrService);

  ngOnInit() {
    this.getAllProducts();
  }

  // Fetch all products
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

  // Update Form
  updateForm = new FormGroup({
    id: new FormControl(0),
    productName: new FormControl('', Validators.required),
    productCode: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    sellingPrice: new FormControl(0, Validators.required),
    purchasePrice: new FormControl(0, Validators.required),
    purchaseDate: new FormControl('', Validators.required),
    stock: new FormControl(0, Validators.required),
    isDeleted: new FormControl(true, Validators.required)
  });

  // Add Form
  addForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    // productCode: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    sellingPrice: new FormControl(0, Validators.required),
    purchasePrice: new FormControl(0, Validators.required),
    purchaseDate: new FormControl('', Validators.required),
    stock: new FormControl(0, Validators.required),
    isDeleted: new FormControl(false, Validators.required)
  });

  // Open Edit Form
  onEdit(product: any) {
    const datePipe = new DatePipe('en-US');
    this.isUpdating = true;
    this.updateForm.patchValue({
      id: product.id,
      productName: product.productName,
      productCode: product.productCode,
      category: product.category,
      brand: product.brand,
      sellingPrice: product.sellingPrice,
      purchasePrice: product.purchasePrice,
      purchaseDate: datePipe.transform(product.purchaseDate, 'yyyy-MM-dd'),
      stock: product.stock,
      isDeleted: product.deleted
    });
  }

  // Update Product
  onUpdate() {
    this.productService.updateProduct(this.updateForm.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.toastr.success('Product Updated Successfully');
        this.isUpdating = false;
        this.getAllProducts();
      },
      error: (err: any) => {
        console.error('Error updating product:', err);
      }
    });
  }

  // Open Add Form
  openAddForm() {
    this.isAdding = true;
    this.addForm.reset();
  }

  // Add Product
  onAdd() {
    this.productService.addProduct(this.addForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Product Added Successfully');
        this.isAdding = false;
        this.getAllProducts();
        this.closeAddForm();
      },
      error: (err: any) => {
        console.error('Error adding product:', err);
      }
    });
  }

  // Close Add Form
  closeAddForm() {
    this.isAdding = false;
  }

  // Delete Product
  onDelete(id: number) {
    const isConfirmed = confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      this.productService.deleteProduct(id).subscribe({
        next: (res: any) => {
          this.toastr.error('Product Deleted Successfully', 'Deleted', { timeOut: 3000, closeButton: true });
          this.getAllProducts();
        },
        error: (err: any) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  // Close Update Form
  OnBack() {
    this.isUpdating = false;
  }
}
