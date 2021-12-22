import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `${environment.apiUrl}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(username: string,password: string){
    const payload = {
      "username": username,
      "password": password
  }
    return this.http.post(`${this.baseUrl}/auth/login`, payload, this.httpOptions);
  }

  logout(){
    window.localStorage.removeItem("auth");
    this.router.navigate(['/login']);
  }

  setAuthenticated(){
    window.localStorage.setItem("auth", "true");
  }

  get isAuthenticated(){
    const authStatus = window.localStorage.getItem("auth") || "false";
    return JSON.parse(authStatus);
  }



}
