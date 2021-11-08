import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginInfo } from "src/app/models/login-info";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<{ currentUser: User }> {
    return this.http.get<{ currentUser: User }>('http://localhost:3000/api/user');
  }

  requestAuthentication(loginInfo: LoginInfo, isSignin: boolean): Observable<{ userId: string, token: string, expiresIn: number }> {
    const baseUrl = 'http://localhost:3000';
    const url = isSignin ? baseUrl + '/api/signin' : baseUrl + '/api/signup';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return this.http.post<{ userId: string, token: string, expiresIn: number }>(url, loginInfo, httpOptions);
  }
}
