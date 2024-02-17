import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrdersComponent,
    OrderNewComponent,
    MyAddressComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    OrdersComponent,
    OrderNewComponent,
    MyAddressComponent
  ]
})
export class CustomerModule { }
