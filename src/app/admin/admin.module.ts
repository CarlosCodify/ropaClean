import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcyclesComponent } from './motorcycles/motorcycles.component';
import { OrderListsComponent } from './order-lists/order-lists.component';
import { DriversComponent } from './drivers/drivers.component';



@NgModule({
  declarations: [
    MotorcyclesComponent,
    OrderListsComponent,
    DriversComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MotorcyclesComponent,
    OrderListsComponent,
    DriversComponent
  ]
})
export class AdminModule { }
