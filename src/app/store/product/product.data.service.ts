import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/api/products');
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/products/${id}`);
  }

  createProduct(product: FormData): Observable<any> {
    const url = 'http://localhost:3000/api/products';
    return this.http.post(url, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/products/${id}`);
  }
}
