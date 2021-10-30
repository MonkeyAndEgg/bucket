import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CartRequest } from "src/app/models/cart";

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  constructor(private http: HttpClient) {}

  getCartById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/orders/${id}`);
  }

  addToCart(cart: CartRequest, cartId?: string): Observable<any> {
    if (cartId) {
      return this.http.put(`http://localhost:3000/api/orders/${cartId}`, cart)
    } else {
      return this.http.post('http://localhost:3000/api/orders', cart);
    }
  }
}
