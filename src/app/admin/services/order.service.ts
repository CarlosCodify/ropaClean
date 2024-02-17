import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Order } from '../../interfaces/order_interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersServices {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  list(): Observable<Order[]>{
    const url = `${this.baseUrl}/api/v1/orders`

    return this.http.get<Order[]>(url)
      .pipe(
        map( (response: Order[]) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }

  showOrder(orderId:number): Observable<Order>{
    const url = `${this.baseUrl}/api/v1/orders/${orderId}`

    return this.http.get<Order>(url)
      .pipe(
        map( (response: Order) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }

  updateStatus(order_status:string, orderId:number): Observable<Order>{
    const url = `${this.baseUrl}/api/v1/orders/${orderId}/update_status`
    const params = { order_status: order_status}

    return this.http.post<Order>(url, params)
      .pipe(
        map( (response: Order) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }

  createOrder(pickup_address_id:number, delivery_addres_id:number, notes:string):Observable<boolean> {
    const url = `${this.baseUrl}/api/v1/orders`
    const order_body = { pickup_address_id, delivery_addres_id, notes}

    return this.http.post(url, {order: order_body}, { observe: 'response' })
      .pipe(
        map( (__) => true),
        catchError( err => {
          return throwError( () => err.error.errors.full_messages[0]);
        })
      )
  }
}
