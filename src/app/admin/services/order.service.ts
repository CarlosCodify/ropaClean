import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ClothingInventory, ClothingInventoryType, Order, Payment } from '../../interfaces/order_interface';

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

  createOrder(pickup_address_id: number, delivery_address_id: number, notes: string): Observable<Order> {
    const url = `${this.baseUrl}/api/v1/orders`;
    const order_body = { pickup_address_id, delivery_address_id, notes };

    return this.http.post<Order>(url, { order: order_body })
      .pipe(
        catchError(err => {
          let errorMessage = 'An error occurred while processing your request.';
          if (err.error.errors && err.error.errors.full_messages && err.error.errors.full_messages.length > 0) {
            errorMessage = err.error.errors.full_messages[0];
          }
          return throwError(() => errorMessage);
        })
      );
  }

  addInventory(orderId:number, quantity:number, clothing_type_id:number): Observable<boolean> {
    const url = `${this.baseUrl}/api/v1/orders/${orderId}/add_inventory`;
    const params = { quantity, clothing_type_id };

    return this.http.post<ClothingInventory>(url, { clothing_inventory: params })
      .pipe(
        map( () => true ),
        catchError(err => {
          let errorMessage = 'An error occurred while processing your request.';
          if (err.error.errors && err.error.errors.full_messages && err.error.errors.full_messages.length > 0) {
            errorMessage = err.error.errors.full_messages[0];
          }
          return throwError(() => errorMessage);
        })
      );
  }

  addPayment(orderId:number, amount:number): Observable<boolean> {
    const url = `${this.baseUrl}/api/v1/orders/${orderId}/add_payment`;
    const params = { amount };

    return this.http.post<Payment>(url, { payment: params })
      .pipe(
        map( () => true ),
        catchError(err => {
          let errorMessage = 'An error occurred while processing your request.';
          if (err.error.errors && err.error.errors.full_messages && err.error.errors.full_messages.length > 0) {
            errorMessage = err.error.errors.full_messages[0];
          }
          return throwError(() => errorMessage);
        })
      );
  }

  clothingTypes():Observable<ClothingInventoryType[]>{
    const url = `${this.baseUrl}/api/v1/orders/clothing_types`

    return this.http.get<ClothingInventoryType[]>(url)
      .pipe(
        map( (response: ClothingInventoryType[]) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }
}
