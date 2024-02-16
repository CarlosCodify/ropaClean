import { Component, inject } from '@angular/core';
import { Driver } from './interfaces/driver.interface';
import { DriverServices } from '../services/driver.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Motorcycle } from '../motorcycles/interfaces/motorcycle.interface';

function passwordsMatchValidator(formGroup: FormGroup): ValidationErrors | null {
  const password = formGroup.get('password');
  const passwordConfirmation = formGroup.get('passwordConfirmation');

  if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
    return { passwordsDontMatch: true };
  }

  return null;
}
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
})
export class DriversComponent {
  public drivers: Driver[] = [];
  public motorcycles: Motorcycle[] = [];

  private driverService = inject(DriverServices);
  private fb = inject( FormBuilder );

  ngOnInit(): void {
    this.load();
  }

  load () {
    this.driverService.list().subscribe( data => this.drivers = data );
    this.driverService.freeList().subscribe( data => this.motorcycles = data );
  }

  public myForm: FormGroup = this.fb.group({
    first_name: ['', [ Validators.required ]],
    last_name: ['', [ Validators.required ]],
    phone: ['', [ Validators.required, Validators.maxLength(8) ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password_confirmation: ['', [ Validators.required, Validators.minLength(6) ]],
    driver_license: ['', [ Validators.required ]],
    identity_card: ['', [ Validators.required ]],
    motorcycle_id: [0, [Validators.required, Validators.pattern('^[0-9]*$')]]
  },{ validators: passwordsMatchValidator } );

  create(){
    const { first_name, last_name, phone, email, password, password_confirmation, driver_license, identity_card, motorcycle_id } = this.myForm.value;

    this.driverService.create(first_name, last_name, phone, email, password, password_confirmation, driver_license, identity_card, motorcycle_id)
      .subscribe({
        next: () => {
          this.load();
        },
        error: ( ) => {}
      }
    )
  }
}
