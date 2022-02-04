import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart";
import { Order } from "src/app/models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  constructor(private http: HttpClient) {}

  getCartById(id: string): Observable<Cart> {
    return this.http.get<Cart>(`http://localhost:3000/api/cart/${id}`);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`http://localhost:3000/api/order/${id}`);
  }

  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`http://localhost:3000/api/orders/${userId}`);
  }

  addToCart(cart: CartRequest, cartId?: string): Observable<Cart> {
    if (cartId) {
      return this.http.put<Cart>(`http://localhost:3000/api/cart/${cartId}`, cart)
    } else {
      // this usually should not be triggered since each user will have cart once signup
      return this.http.post<Cart>('http://localhost:3000/api/cart', cart);
    }
  }
}
