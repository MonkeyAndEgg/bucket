import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/products');
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/products/${id}`);
  }

  createProduct(product: FormData): Observable<Product> {
    const url = 'http://localhost:3000/api/products';
    return this.http.post<Product>(url, product);
  }

  deleteProduct(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`http://localhost:3000/api/products/${id}`);
  }
}
