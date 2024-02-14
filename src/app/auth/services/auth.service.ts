import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthResponse, AuthStatus, CheckTokenResponse, User } from '../interfaces';
import { EmailValidator } from '@angular/forms';
import { RegisterUser } from '../interfaces/register-user.interface';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.cheking );

  public currentUser = computed( () => this._currentUser() )
  public authStatus = computed( () => this._authStatus() )

  constructor() {
    this.checkAuthStatus().subscribe();
   }

  private setAuthentication( response: HttpResponse<AuthResponse | CheckTokenResponse | RegisterUser> ) :boolean {
    const headers = response.headers;
    const user: User = response.body!.data;
    const token = headers.get('Authorization');

    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token!)
    console.log('Se logro crear');
    return true;
  }

  login( email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/sign_in`
    const body = { email, password };

    return this.http.post<AuthResponse>( url, body, { observe: 'response' })
      .pipe(
        map( (response) => this.setAuthentication(response)),
        catchError( err => {
          return throwError( () => err.error.errors[0]);
        })
      );
  }

  registerUser( email:EmailValidator, password:string, password_confirmation:string):Observable<boolean> {
    const url = `${this.baseUrl}/auth`
    const body = { email, password, password_confirmation}

    return this.http.post<RegisterUser>(url, body, { observe: 'response' })
      .pipe(
        map( (response) => this.setAuthentication(response)),
        catchError( err => {
          return throwError( () => err.error.errors.full_messages[0]);
        })
      )
  }

  checkAuthStatus():Observable<boolean> {
    const url = `${this.baseUrl}/auth/validate_token`
    const token = localStorage.getItem('token');

    if( !token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.get<CheckTokenResponse>(url, { headers, observe: 'response' })
      .pipe(
        map( (response) => this.setAuthentication(response)),
        catchError( () => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false);
        } )
      )

  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}
