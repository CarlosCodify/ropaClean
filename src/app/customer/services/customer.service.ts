import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Address } from '../../interfaces/address_interface';
import { Order } from '../../interfaces/order_interface';


@Injectable({
  providedIn: 'root'
})
export class CustomerServices {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  myAddress(customerId: number):Observable<Address[]>{
    const url = `${this.baseUrl}/api/v1/customers/${customerId}/address`

    return this.http.get<Address[]>(url)
      .pipe(
        map( (response: Address[]) => {
          response.forEach(address => {
            address.latitude = Number(address.latitude);
            address.longitude = Number(address.longitude);
          });
          return response;
        } ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }

  address(addresId:number):Observable<Address>{
    const url = `${this.baseUrl}/api/v1/customers/address_show`
    const  params = { id: addresId}
    return this.http.post<Address>(url, params)
      .pipe(
        map( (address: Address) => {
            address.latitude = Number(address.latitude);
            address.longitude = Number(address.longitude);
          return address;
        } ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }

  createAddress(customerId:number, address:string, latitude:string, longitude:string):Observable<boolean>{
    const url = `${this.baseUrl}/api/v1/customers/${customerId}/add_address`
    const address_body = { latitude, longitude, address}

    return this.http.post<Address[]>(url, { address: address_body }, { observe: 'response' })
      .pipe(
        map( () => true),
        catchError( err => {
          return throwError( () => err);
        })
      );
  }

  orderList(customerId:number):Observable<Order[]>{
    const url = `${this.baseUrl}/api/v1/customers/${customerId}/order_list`

    return this.http.get<Order[]>(url)
      .pipe(
        map( (response: Order[]) => { return response } ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }
}
