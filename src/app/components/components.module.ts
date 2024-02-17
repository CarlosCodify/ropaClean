import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { OrderViewComponent } from './order-view/order-view.component';
import { MiniMapComponent } from './mini-map/mini-map.component';



@NgModule({
  declarations: [
    OrderViewComponent,
    MiniMapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    OrderViewComponent,
    MiniMapComponent
  ]
})
export class ComponentsModule { }
