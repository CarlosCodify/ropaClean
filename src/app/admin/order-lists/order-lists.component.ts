import { Component, OnInit, inject } from '@angular/core';
import { Order } from '../../interfaces/order_interface';
import { OrdersServices } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-lists',
  templateUrl: './order-lists.component.html',
})
export class OrderListsComponent implements OnInit {

  public orders?: Order[];

  private orderService = inject(OrdersServices);
  private router = inject(Router);

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.orderService.list().subscribe( data => this.orders = data)
  }

  orderView(orderId: number){
    this.router.navigateByUrl(`/dashboard/order/${orderId}`);
  }
}
