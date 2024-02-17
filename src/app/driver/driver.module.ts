import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    MyOrdersComponent,
    NewOrdersComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    MyOrdersComponent,
    NewOrdersComponent
  ]
})
export class DriverModule { }
