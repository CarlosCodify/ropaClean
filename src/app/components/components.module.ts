import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { OrderViewComponent } from './order-view/order-view.component';



@NgModule({
  declarations: [
    OrderViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    OrderViewComponent
  ]
})
export class ComponentsModule { }
