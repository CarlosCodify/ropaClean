import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Motorcycle } from '../motorcycles/interfaces/motorcycle.interface';
import { Model } from '../motorcycles/interfaces/model.interface';
import { Brand } from '../motorcycles/interfaces/brand.interface';

@Injectable({
  providedIn: 'root'
})
export class MotorcyclesServices {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  list(): Observable<Motorcycle[]>{
    const url = `${this.baseUrl}/api/v1/motorcycles`

    return this.http.get<Motorcycle[]>(url)
      .pipe(
        map( (response: Motorcycle[]) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }

  create (status:boolean, license_plate:string, model_id:number):Observable<boolean>{
    const url = `${this.baseUrl}/api/v1/motorcycles`
    const body = { status, license_plate, model_id }

    return this.http.post<boolean>( url, {motorcycle: body})
    .pipe(
      map( () => true),
      catchError( err => {
        return throwError( () => err);
      })
    );
  }

  brandList(): Observable<Brand[]>{
    const url = `${this.baseUrl}/api/v1/brands`

    return this.http.get<Brand[]>(url)
      .pipe(
        map( (response: Brand[]) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }

  modelList(brandId: number): Observable<Model[]>{
    const url = `${this.baseUrl}/api/v1/brands/${brandId}/models`

    return this.http.get<Model[]>(url)
      .pipe(
        map( (response: Model[]) => { return response} ),
        catchError( err => {
          return throwError( () => {} );
        })
      )
  }
}
