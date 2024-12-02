import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient)
  
  addProduct(data:any){
    this.http.post('https://localhost:7053/api/Product/addProduct', data);
  }

  getAllProducts(){
    this.http.get('https://localhost:7053/api/Product/getAllProducts')
  }

  getProductById(Id: any){
    this.http.get(`https://localhost:7053/api/Product/getProductById/${Id}`)
  }

  updateProduct(data:any){
    this.http.put(`https://localhost:7053/api/Product/updateProduct/${data.id}`, data)
  }

  deleteProduct(Id: any){
    this.http.delete(`https://localhost:7053/api/Product/deleteProduct/${Id}`)
  }
}
