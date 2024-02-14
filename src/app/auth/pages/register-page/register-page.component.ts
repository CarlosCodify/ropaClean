import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

function passwordsMatchValidator(formGroup: FormGroup): ValidationErrors | null {
  const password = formGroup.get('password');
  const passwordConfirmation = formGroup.get('passwordConfirmation');

  if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
    return { passwordsDontMatch: true };
  }

  return null;
}
@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );

  public myFormRegister: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    passwordConfirmation: ['', [ Validators.required, Validators.minLength(6) ]],
  },{ validators: passwordsMatchValidator } );

  register() {
    const { email, password, passwordConfirmation} = this.myFormRegister.value;

    this.authService.registerUser( email, password, passwordConfirmation)
      .subscribe( {
        next: () => this.router.navigateByUrl('/dashboard'),
        error: ( message ) => {
          Swal.fire('Error', message, 'error')
        }
      })
  }
}
