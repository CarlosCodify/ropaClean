import { Component, OnInit, computed, inject } from '@angular/core';
import { Order } from '../../interfaces/order_interface';
import { Router } from '@angular/router';
import { CustomerServices } from '../services/customer.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {

  private customerService = inject(CustomerServices);
  private router = inject(Router);
  private authService = inject(AuthService)

  public orders?: Order[];
  public user = computed(() => this.authService.currentUser() );


  ngOnInit(): void {
    this.load();
  }

  load(){
    this.customerService.orderList(this.user()!.id).subscribe( data => this.orders = data)
  }

  orderView(orderId: number){
    this.router.navigateByUrl(`/dashboard/customers/order/${orderId}`);
  }
}
