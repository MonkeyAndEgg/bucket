import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaymentRequestPayload } from "src/app/models/payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {
  constructor(private http: HttpClient) {}

  processPayment(payment: PaymentRequestPayload): Observable<any> {
    const url = 'http://localhost:3000/api/payment';
    return this.http.post(url, payment);
  }
}
