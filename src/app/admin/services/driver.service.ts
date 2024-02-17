import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Driver } from '../drivers/interfaces/driver.interface';
import { EmailValidator } from '@angular/forms';
import { RegisterDriver } from '../drivers/interfaces/register-driver.interface';
import { Motorcycle } from '../motorcycles/interfaces/motorcycle.interface';
import { Resume } from '../../interfaces/resume_interface';
import { Order } from '../../interfaces/order_interface';

@Injectable({
  providedIn: 'root'
})
export class DriverServices {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  list(): Observable<Driver[]>{
    const url = `${this.baseUrl}/api/v1/drivers`

    return this.http.get<Driver[]>(url)
      .pipe(
        map( (response: Driver[]) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }

  create (first_name:string, last_name:string, phone:string, email:EmailValidator, password:string, password_confirmation:string, driver_license:string, identity_card:string, motorcycle_id:number):Observable<boolean>{
    const url = `${this.baseUrl}/api/v1/drivers`
    const user_body = { email, password, password_confirmation}
    const person_body = { first_name, last_name, phone, email}
    const driver_body = { driver_license, identity_card, motorcycle_id }

    return this.http.post<RegisterDriver>(url, {user: user_body, person: person_body, driver: driver_body}, { observe: 'response' })
      .pipe(
        map( () => true),
        catchError( err => {
          return throwError( () => err);
        })
      );
  }

  freeList ():Observable<Motorcycle[]>{
    const url = `${this.baseUrl}/api/v1/motorcycles/list`

    return this.http.get<Motorcycle[]>(url)
      .pipe(
        map( (response: Motorcycle[]) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }


  resume():Observable<Resume>{
    const url = `${this.baseUrl}/api/v1/orders/resume`

    return this.http.get<Resume>(url)
      .pipe(
        map( (response: Resume) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }

  currentOrder(driverId: number):Observable<Order>{
    const url = `${this.baseUrl}/api/v1/drivers/${driverId}/order`

    return this.http.get<Order>(url)
      .pipe(
        map( (response: Order) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }

  orderList(driverId: number):Observable<Order[]>{
    const url = `${this.baseUrl}/api/v1/drivers/${driverId}/order_list`

    return this.http.get<Order[]>(url)
      .pipe(
        map( (response: Order[]) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }
}
