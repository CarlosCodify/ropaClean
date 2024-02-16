import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcyclesComponent } from './motorcycles/motorcycles.component';
import { OrderListsComponent } from './order-lists/order-lists.component';
import { DriversComponent } from './drivers/drivers.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MotorcyclesComponent,
    OrderListsComponent,
    DriversComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    MotorcyclesComponent,
    OrderListsComponent,
    DriversComponent
  ]
})
export class AdminModule { }
