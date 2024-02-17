import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { OrderViewComponent } from './order-view/order-view.component';
import { MiniMapComponent } from './mini-map/mini-map.component';
import { OrderCustomerComponent } from './order-customer/order-customer.component';



@NgModule({
  declarations: [
    OrderViewComponent,
    MiniMapComponent,
    OrderCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderViewComponent,
    MiniMapComponent,
    OrderCustomerComponent
  ]
})
export class ComponentsModule { }
