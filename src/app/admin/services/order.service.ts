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
}
