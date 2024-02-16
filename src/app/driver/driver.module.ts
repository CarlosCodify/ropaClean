import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';



@NgModule({
  declarations: [
    MyOrdersComponent,
    NewOrdersComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MyOrdersComponent,
    NewOrdersComponent
  ]
})
export class DriverModule { }
