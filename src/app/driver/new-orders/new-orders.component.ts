import { Component, OnInit, computed, inject } from '@angular/core';
import { Order } from '../../interfaces/order_interface';
import { DriverServices } from '../../admin/services/driver.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html'
})
export class NewOrdersComponent implements OnInit{

  public orders?: Order[];
  private driverService = inject(DriverServices);
  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser() );

  private router = inject(Router);

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.driverService.orderList(this.user()!.id).subscribe( data => this.orders = data)
  }

  orderView(orderId: number){
    this.router.navigateByUrl(`/dashboard/order/${orderId}`);
  }
}
