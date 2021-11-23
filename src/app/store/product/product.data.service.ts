import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  constructor(private http: HttpClient) {}

  getProducts(filter: string | undefined, sort: string | undefined): Observable<Product[]> {
    let baseUrl = 'http://localhost:3000/api/products';
    baseUrl += this.generateQueryParams(filter, sort);
    return this.http.get<Product[]>(baseUrl);
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

  private generateQueryParams(filter: string | undefined, sort: string | undefined): string {
    let queryParam = '';
    if (filter || sort) {
      queryParam += '?';

      if (filter) {
        queryParam += `filter=${filter}`;
        queryParam = sort ? queryParam + '&' : queryParam;
      }

      if (sort) {
        queryParam += `sort=${sort}`;
      }
    }
    return queryParam;
  }
}
