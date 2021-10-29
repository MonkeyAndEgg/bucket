import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  constructor(private http: HttpClient) {}

  getCartById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/orders/${id}`);
  }
}
