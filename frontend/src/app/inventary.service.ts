import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventaryService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getClients() {
    return this.http.get(this.baseUrl + "/client")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createClient(obj) {
    return this.http.post(this.baseUrl + '/client', JSON.stringify(obj), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getProducts() {
    return this.http.get(this.baseUrl + "/product")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getClientOrders(id) {
    return this.http.get(this.baseUrl + "/client/" + id + "/orders")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createProduct(obj) {
    return this.http.post(this.baseUrl + '/product', JSON.stringify(obj), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createOrder(obj) {
    return this.http.post(this.baseUrl + '/order', JSON.stringify(obj), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    console.log(error.message);
    return throwError('A data error occurred, please try again.')
  }

}
