import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject( AuthService );
  private router = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {
    if ( this.authService.authStatus() === AuthStatus.cheking ){
      return false;
    }
    return true;
  })


  public authStatusChangedEffect = effect( () => {


    switch ( this.authService.authStatus() ){

      case AuthStatus.cheking:
        return;

      case AuthStatus.authenticated: return this.router.navigateByUrl('/dashboard');

      default: return this.router.navigateByUrl('/auth/login');

    }
  });


}
