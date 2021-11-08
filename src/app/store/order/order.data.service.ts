import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart";

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  constructor(private http: HttpClient) {}

  getCartById(id: string): Observable<Cart> {
    return this.http.get<Cart>(`http://localhost:3000/api/orders/${id}`);
  }

  addToCart(cart: CartRequest, cartId?: string): Observable<Cart> {
    if (cartId) {
      return this.http.put<Cart>(`http://localhost:3000/api/orders/${cartId}`, cart)
    } else {
      return this.http.post<Cart>('http://localhost:3000/api/orders', cart);
    }
  }
}
