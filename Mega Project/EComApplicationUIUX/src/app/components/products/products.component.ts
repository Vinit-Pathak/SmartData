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
  imgUrl: string = '';

  productService = inject(ProductService);
  toastr = inject(ToastrService);

  ngOnInit() {
    this.getAllProducts();

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

  
  updateForm = new FormGroup({
    id: new FormControl(0),
    productName: new FormControl(''),
    productCode: new FormControl(''),
    category: new FormControl(''),
    brand: new FormControl(''),
    file: new FormControl<File | null>(null),
    sellingPrice: new FormControl(0),
    purchasePrice: new FormControl(0),
    purchaseDate: new FormControl(''),
    stock: new FormControl(0),
  });

  
  addForm = new FormGroup({
    productName: new FormControl(''),
    productCode: new FormControl(''),
    category: new FormControl(''),
    brand: new FormControl(''),
    file: new FormControl<File | null>(null),
    sellingPrice: new FormControl(0),
    purchasePrice: new FormControl(0),
    purchaseDate: new FormControl(''),
    stock: new FormControl(0),
  });


  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.updateForm.patchValue({ file });
    this.updateForm.get('file')?.updateValueAndValidity();
  }

  onFileSelectedAdd(event:Event){
    const file = (event.target as HTMLInputElement).files?.[0];
    this.addForm.patchValue({ file });
    this.addForm.get('file')?.updateValueAndValidity();
  }

  
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
    });
  }

  
  onUpdate() {
    
    if (this.updateForm.invalid) {
      this.toastr.error('Please fill in all required fields.', 'Error', {
        timeOut: 3000,
        closeButton: true,
      });
      return;
    }
  
    
    console.log('Updating product:', this.updateForm.value);
  
    
    const formData = new FormData();
    Object.keys(this.updateForm.controls).forEach((field) => {
      const value = this.updateForm.get(field)?.value;
      if (field !== 'file') {
        formData.append(field, value !== undefined ? value : '');
      } else {
        const fileInput = this.updateForm.get('file')?.value;
        if (fileInput) {
          formData.append('file', fileInput, fileInput.name);
        }
      }
    });
  
    
    const productId = this.updateForm.get('id')?.value;
    
    this.productService.updateProduct(productId, formData).subscribe({
      next: (res: any) => {
        
        this.toastr.success('Product Updated Successfully', 'Success', {
          timeOut: 3000,
          closeButton: true,
        });
  
        
        this.isUpdating = false;
        this.getAllProducts();  
        this.closeAddForm();    
      },
      error: (err: any) => {
        
        this.toastr.error('Product Update Failed', 'Error', {
          timeOut: 3000,
          closeButton: true,
        });
        console.error('Error updating product:', err);
      },
    });
  }

  
  openAddForm() {
    this.isAdding = true;
    this.addForm.reset();
  }

  
  onAdd() {
    const formData = new FormData();
    Object.keys(this.addForm.controls).forEach(field => {
      const value = this.addForm.get(field)?.value;
      formData.append(field, value);
    });

    console.log('Adding product:', formData);
    
    this.productService.addProduct(formData).subscribe({
      next: (res: any) => {
        this.toastr.success('Product Added Successfully', 'Success', {
          timeOut: 3000,
          closeButton: true,
        });
        this.isAdding = false;
        this.getAllProducts();
        this.closeAddForm();
      },
      error: (err: any) => {
        console.error('Error adding product:', err);
      }
    });
  }

  
  closeAddForm() {
    this.isAdding = false;
    this.addForm.reset();
  }

  
  onDelete(id: number) {
    console.log('Deleting product:', id);
    console.log('Products: ', this.products);
    const isConfirmed = confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      this.productService.deleteProduct(id).subscribe({
        next: (res: any) => {
          this.getAllProducts();
          this.toastr.error('Product Deleted Successfully', 'Deleted', { timeOut: 3000, closeButton: true });
        },
        error: (err: any) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  
  OnBack() {
    this.isUpdating = false;
  }
}
