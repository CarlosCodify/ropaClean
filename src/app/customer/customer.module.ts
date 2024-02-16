import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { OrderNewComponent } from './order-new/order-new.component';



@NgModule({
  declarations: [
    OrdersComponent,
    OrderNewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrdersComponent,
    OrderNewComponent
  ]
})
export class CustomerModule { }
