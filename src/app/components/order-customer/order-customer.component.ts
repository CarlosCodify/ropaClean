import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Map} from 'mapbox-gl';
import { MapService } from '../../services/map.service';
import mapboxgl from 'mapbox-gl';
import { ClothingInventoryType, Order } from '../../interfaces/order_interface';
import { OrdersServices } from '../../admin/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html'
})
export class OrderCustomerComponent implements OnInit, AfterViewInit {
  private mapService = inject(MapService);
  private fb = inject( FormBuilder );

  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;

  private orderId?: number;
  public order?: Order;
  private orderService = inject(OrdersServices);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public clothing_types?: ClothingInventoryType[];

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.load().subscribe(() => {
      this.mapService.createMarkersFromOrder(this.order!);
      this.getDirections();
    });
    this.orderService.clothingTypes().subscribe(data => this.clothing_types = data)
  }
  public myFormInventory: FormGroup = this.fb.group({
    quantity: [0, [ Validators.required ]],
    clothing_type_id: [0, [ Validators.required ]],
  });

  public myFormPayment: FormGroup = this.fb.group({
    amount: ['', [ Validators.required ]],
  });

  load(): Observable<null> {
    return this.orderService.showOrder(this.orderId!).pipe(
      map(data => {
        this.order = data;
        return null;
      })
    );
  }

  ngAfterViewInit(): void {
    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybG9zaG9kemljIiwiYSI6ImNsbGZucnJ5azBzOG4zZGw2a3FjYjBpd3IifQ.MAJJoNIelfLsDRJ_GlLBzQ';
    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: [-63.201041152478226, -17.76748594084425], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    this.mapService.setMap( map );
  }

  getDirections() {
    if ( !this.order ) return;
    const start_longitude = Number(this.order.driver.longitude);
    const start_latitude = Number(this.order.driver.latitude);
    let end_longitude: number;
    let end_latitude: number;
    if (this.order.order_status.name === 'En borrador'){
      end_longitude = Number(this.order.pickup_address.longitude);
      end_latitude = Number(this.order.pickup_address.latitude);
    } else{
      end_longitude = Number(this.order.delivery_address.longitude);
      end_latitude = Number(this.order.delivery_address.latitude);
    }

    this.mapService.getRouteBetweenPoints([start_longitude, start_latitude], [end_longitude, end_latitude]);
  }

  createInventory(orderId: number){
    const { quantity, clothing_type_id } = this.myFormInventory.value;

    this.orderService.addInventory(orderId, quantity, clothing_type_id)
      .subscribe({
        next: () => {
          this.load().subscribe(()=> { })
        },
        error: ( ) => {}
      }
    )
  }

  createPayment(orderId: number){
    const { amount } = this.myFormPayment.value;
    console.log(amount)
    this.orderService.addPayment(orderId, amount)
      .subscribe({
        next: () => {
          this.load().subscribe(()=> { })
        },
        error: ( ) => {}
      }
    )
  }
}
