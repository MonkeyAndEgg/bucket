import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginInfo } from "src/app/models/login-info";

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get('http://localhost:3000/api/user');
  }

  requestAuthentication(loginInfo: LoginInfo, isSignin: boolean): Observable<any> {
    const baseUrl = 'http://localhost:3000';
    const url = isSignin ? baseUrl + '/api/signin' : baseUrl + '/api/signup';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return this.http.post<LoginInfo>(url, loginInfo, httpOptions);
  }
}
