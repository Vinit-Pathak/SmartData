import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../service/product/product.service';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2'
declare var bootstrap: any;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  role = localStorage.getItem('role');
  isUpdating = false;
  isAdding = false;
  imgUrl: string = '';
  userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
  todayDate=new Date().toISOString().split('T')[0];
  sellingPrice = 0;
  purchasePrice = 0;
  productService = inject(ProductService);
  toastr = inject(ToastrService);

  ngOnInit() {
    // this.getAllProducts();
    this.getAllProductsByUserId();
    this.sanitizeField('sellingPrice');
    this.sanitizeField('purchasePrice');
    this.sanitizeField('stock');

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

  userId = Number(localStorage.getItem('id'));
  getAllProductsByUserId() {
    console.log("User Id: ",this.userId);
    
    this.productService.getProductByUserId(this.userDetails.id).subscribe({
      next: (res: any) => {
        this.products = res;
        console.log("Products: ",this.products)
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
    category: new FormControl(""),
    brand: new FormControl(''),
    file: new FormControl<File | null>(null),
    sellingPrice: new FormControl(0, Validators.min(1)),
    purchasePrice: new FormControl(0, Validators.min(1)),
    purchaseDate: new FormControl(''),
    stock: new FormControl(0, Validators.min(1)),
    userId: new FormControl(0)
  });

  
  addForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    productCode: new FormControl(''),
    category: new FormControl("", Validators.required),
    brand: new FormControl('', Validators.required),
    file: new FormControl<File | null>(null),
    sellingPrice: new FormControl(0, [Validators.required, Validators.min(1)]),
    purchasePrice: new FormControl(0, [Validators.required, Validators.min(1)]),
    purchaseDate: new FormControl(''),
    stock: new FormControl(0, [Validators.required, Validators.min(1)]),
    userId: new FormControl(0)
  });


  sanitizeField(fieldName: string): void {
    this.addForm.get(fieldName)?.valueChanges.subscribe((value) => {
      if (value) {
        let sanitizedValue = value.replace(/[^0-9]/g, '');
        
        sanitizedValue = sanitizedValue.slice(0, 6);
        
        if (value !== sanitizedValue) {
          this.addForm.get(fieldName)?.setValue(sanitizedValue, {
            emitEvent: false,
          });
        }
      }
    });
  }

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

  categories: string[] = [
    'Electronics',
    'Fashion',
    'Mobile',
    'Home & Living',
    'Beauty & Health',
    'Sports & Outdoors',
    'Books & Stationery',
    'Toys & Games',
    'Groceries & Food'
  ];

  
  onUpdate() {
    
    if((this.addForm.get('sellingPrice')?.value ?? 0) < (this.addForm.get('purchasePrice')?.value ?? 0)){
      this.toastr.error('Selling price cannot be less than purchase price', 'Error');
      return;
    }
  
    
    console.log('Updating product:', this.updateForm.value);
  
    
    const formData = new FormData();
    Object.keys(this.updateForm.controls).forEach((field) => {
      const value = this.updateForm.get(field)?.value;
      if (field !== 'file') {
        if(field === 'userId'){
          formData.append(field, this.userDetails.id);  
        } else{
          formData.append(field, value !== undefined ? value : '');
        }
      }
      else {
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
          timeOut: 2000,
          closeButton: true,
        });
  
        
        this.isUpdating = false;
        this.getAllProductsByUserId();  
        this.closeAddForm();    
      },
      error: (err: any) => {
        
        this.toastr.error('Product Update Failed', 'Error', {
          timeOut: 2000,
          closeButton: true,
        });
        console.error('Error updating product:', err);
      },
    });
  }

  
  openAddForm() {
    // debugger
    this.isAdding = true;
    this.addForm.reset();
  }

  
  onAdd() {
    if (this.addForm.invalid) {
      this.toastr.error('Please fill all required fields', 'Error');
      this.addForm.markAllAsTouched();
      return;
    }else if((this.addForm.get('sellingPrice')?.value ?? 0) < (this.addForm.get('purchasePrice')?.value ?? 0)){
      this.toastr.error('Selling price cannot be less than purchase price', 'Error');
      return;
    }
    const formData = new FormData();
    Object.keys(this.addForm.controls).forEach(field => {
      const value = this.addForm.get(field)?.value;
      if(field === 'userId'){
        formData.append(field, this.userDetails.id);
      }else{
        formData.append(field, value);
      }
    });

    console.log('Adding product:', formData);
    
    this.productService.addProduct(formData).subscribe({
      next: (res: any) => {
        this.toastr.success('Product Added Successfully', 'Success', {
          timeOut: 2000,
          closeButton: true,
        });
        this.isAdding = false;
        this.getAllProductsByUserId();
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
        this.onDelete(productId);
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Your item is safe.', 'info');
      }
    });
  }

//   deleteProduct(productId: number) {
//     this.productService.deleteProductById(productId).subscribe(
//       () => {
//         Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
//         this.toaster.success('Product deleted successfully', 'Success');
//         this.loadProducts()
//       },
//       (error) => {
//         this.toaster.error('Error deleting product', 'Error');
//         console.error('Error deleting product:', error)
//       }
//     );
  
// }

onDelete(id:number){
  this.productService.deleteProduct(id).subscribe(
    ()=>{
      Swal.fire('Deleted!', 'Your Product deleted Successfully.', 'success');
      this.toastr.success('Product deleted Successfully', 'Success',{
        timeOut: 2000,
        closeButton: true,
      });
      this.getAllProductsByUserId();
    },
    (error)=>{
      this.toastr.error('Error deleting product', 'Error',{
        timeOut: 2000,
        closeButton: true,
      });
      console.log('Error deleting product:', error);
    }
  )
}


  
  // onDelete(id: number) {
  //   console.log('Deleting product:', id);
  //   console.log('Products: ', this.products);
  //   const isConfirmed = confirm('Are you sure you want to delete this product?');
  //   if (isConfirmed) {
  //     this.productService.deleteProduct(id).subscribe({
  //       next: (res: any) => {
  //         this.getAllProductsByUserId();
  //         this.toastr.error('Product Deleted Successfully', 'Deleted', { timeOut: 3000, closeButton: true });
  //       },
  //       error: (err: any) => {
  //         console.error('Error deleting product:', err);
  //       }
  //     });
  //   }
  // }

  selectedProduct: any = {};
  openModal(product: any) {
    this.selectedProduct = product;  
    const modal = new bootstrap.Modal(document.getElementById('productDetailsModal') as HTMLElement);
    modal.show();  
  }

  closeModal(){
    const modal = new bootstrap.Modal(document.getElementById('productDetailsModal') as HTMLElement);
    modal.hide();
  }
  
  OnBack() {
    this.isUpdating = false;
  }
}
