import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginInfo } from "src/app/models/login-info";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getUser(): Observable<{ currentUser: User }> {
    return this.http.get<{ currentUser: User }>(`${this.BASE_URL}/api/user`);
  }

  requestAuthentication(loginInfo: LoginInfo, isSignin: boolean): Observable<{ userId: string, token: string, expiresIn: number }> {
    const url = isSignin ? this.BASE_URL + '/api/signin' : this.BASE_URL + '/api/signup';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return this.http.post<{ userId: string, token: string, expiresIn: number }>(url, loginInfo, httpOptions);
  }

  requestPasswordReset(email: string): Observable<any> {
    const requestBody = {
      email
    };
    return this.http.post(this.BASE_URL + '/api/reset-password', requestBody);
  }

  resetPassword(userId: string, password: string): Observable<{ userId: string, token: string, expiresIn: number }> {
    const requestBody = {
      password
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return this.http.post<{ userId: string, token: string, expiresIn: number }>(
      this.BASE_URL + `/api/reset-password/${userId}`, requestBody, httpOptions
    );
  }
}
