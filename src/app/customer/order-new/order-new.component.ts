import { ChangeDetectorRef, Component, Input, OnInit, computed, inject } from '@angular/core';
import { OrdersServices } from '../../admin/services/order.service';
import { CustomerServices } from '../services/customer.service';
import { Address } from '../../interfaces/address_interface';
import { Order } from '../../interfaces/order_interface';
import { AuthService } from '../../auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html'
})
export class OrderNewComponent implements OnInit{

  private orderService = inject(OrdersServices);
  private customerService = inject(CustomerServices);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject( FormBuilder );

  public myAddress: Address[]= [];
  public pickupSelected: Address = { id: 0, address: 'test', longitude: -63.201041152478226, latitude: -17.76748594084425, customer_id: 0 };
  public deliverySelected: Address = { id: 0, address: 'test', longitude: -63.201041152478226, latitude: -17.76748594084425, customer_id: 0 };
  public pickupSelectedBD?: Address;
  public deliverySelectedBD?: Address;
  public order?: Order;
  public user = computed(() => this.authService.currentUser() );

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public myForm: FormGroup = this.fb.group({
    pickup_address_id: [0, Validators.required],
    delivery_address_id: [0, Validators.required],
    notes: ['', [Validators.required, Validators.minLength(6)]],
  })

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.customerService.myAddress(this.user()!.id).subscribe(data => this.myAddress = data)
  }

  createOrder(){
    const { pickup_address_id, delivery_address_id, notes } = this.myForm.value;

    this.orderService.createOrder(pickup_address_id, delivery_address_id, notes)
      .subscribe(order => {
        this.router.navigateByUrl(`/dashboard/customers/order/${order.id}`);
      })
  }

  pickupAddress(addressId:number){
    this.customerService.address(addressId).subscribe(data => this.pickupSelectedBD = data)
    this.changeDetectorRef.detectChanges(); // Detectar cambios
  }

  deliveryAddress(addressId:number){
    this.customerService.address(addressId).subscribe(data => this.deliverySelectedBD = data )
    this.changeDetectorRef.detectChanges(); // Detectar cambios
  }
}
