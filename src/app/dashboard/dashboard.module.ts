import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerModule } from '../customer/customer.module';
import { AdminModule } from '../admin/admin.module';
import { DriverModule } from '../driver/driver.module';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    CustomerModule,
    AdminModule,
    DriverModule
  ]
})
export class DashboardModule { }
