import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcyclesComponent } from './motorcycles/motorcycles.component';
import { OrderListsComponent } from './order-lists/order-lists.component';
import { DriversComponent } from './drivers/drivers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MotorcyclesComponent,
    OrderListsComponent,
    DriversComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    MotorcyclesComponent,
    OrderListsComponent,
    DriversComponent
  ]
})
export class AdminModule { }
