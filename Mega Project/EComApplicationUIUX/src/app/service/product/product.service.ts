import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient)
  
  addProduct(data:any):Observable<any>{
    return this.http.post('https://localhost:7053/api/Product/addProduct', data);
  }

  getAllProducts():Observable<any>{
    return this.http.get('https://localhost:7053/api/Product/getAllProducts')
  }

  getProductById(Id: any):Observable<any>{
    return this.http.get(`https://localhost:7053/api/Product/getProductById/${Id}`)
  }

  updateProduct(data:any):Observable<any>{
    return this.http.put(`https://localhost:7053/api/Product/updateProduct/${data.id}`, data)
  }

  deleteProduct(Id: any):Observable<any>{
    return this.http.delete(`https://localhost:7053/api/Product/deleteProduct/${Id}`)
  }



}
