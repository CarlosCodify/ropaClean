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

  // registerUser( first_name:string, last_name:string, phone:string, email:EmailValidator, password:string, password_confirmation:string):Observable<boolean> {
  //   const url = `${this.baseUrl}/api/v1/users/register`
  //   const user_body = { email, password, password_confirmation}
  //   const person_body = { first_name, last_name, phone, email}

  //   return this.http.post<RegisterUser>(url, {user: user_body, person: person_body}, { observe: 'response' })
  //     .pipe(
  //       map( (response) => this.setAuthentication(response)),
  //       catchError( err => {
  //         return throwError( () => err.error.errors.full_messages[0]);
  //       })
  //     )
  // }
}
