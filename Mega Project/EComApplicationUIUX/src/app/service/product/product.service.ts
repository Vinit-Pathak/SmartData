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

  getProductByUserId(userId: any):Observable<any>{
    return this.http.get(`https://localhost:7053/api/Product/getProductByUserId/${userId}`)
  }

  updateProduct(id:any,data:any):Observable<any>{
    return this.http.put(`https://localhost:7053/api/Product/updateProduct/${id}`, data)
  }

  deleteProduct(Id: any):Observable<any>{
    return this.http.delete(`https://localhost:7053/api/Product/deleteProduct/${Id}`)
  }



}
