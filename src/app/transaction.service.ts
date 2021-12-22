import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl: string = `${environment.apiUrl}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(
    private http: HttpClient,
  ) { }

  fetchData(){
    return this.http.get(`${this.baseUrl}/auth/authdata`, this.httpOptions);
  }

  cancel(tx: {}){
    return this.http.post(`${this.baseUrl}/auth/cancel`, tx, this.httpOptions);
  }

}
