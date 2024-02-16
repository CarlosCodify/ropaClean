import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OrdersComponent } from '../customer/orders/orders.component';
import { OrderNewComponent } from '../customer/order-new/order-new.component';
import { MyOrdersComponent } from '../driver/my-orders/my-orders.component';
import { NewOrdersComponent } from '../driver/new-orders/new-orders.component';
import { DriversComponent } from '../admin/drivers/drivers.component';
import { MotorcyclesComponent } from '../admin/motorcycles/motorcycles.component';
import { OrderListsComponent } from '../admin/order-lists/order-lists.component';
import { OrderViewComponent } from '../components/order-view/order-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'order/:id', component: OrderViewComponent },
      // Customer
      { path: 'customers/orders', component: OrdersComponent },
      { path: 'customers/order/new', component: OrderNewComponent },
      // Driver
      { path: 'drivers/orders', component: MyOrdersComponent },
      { path: 'drivers/new-orders', component: NewOrdersComponent },
      // Admin
      { path: 'admin/drivers', component: DriversComponent },
      { path: 'admin/motorcycles', component: MotorcyclesComponent },
      { path: 'admin/orders', component: OrderListsComponent },

      { path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
