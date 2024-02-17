import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, computed, inject } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Order } from '../../interfaces/order_interface';
import { DriverServices } from '../../admin/services/driver.service';
import { Map} from 'mapbox-gl';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import mapboxgl from 'mapbox-gl';
import { OrdersServices } from '../../admin/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent implements OnInit, AfterViewInit{

  private mapService = inject(MapService);
  private authService = inject(AuthService);
  private driverService = inject(DriverServices);
  private orderService = inject(OrdersServices);
  public user = computed(() => this.authService.currentUser() );


  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;

  public order?: Order;

  ngOnInit(): void {
    this.load().subscribe(() => {
      this.mapService.createMarkersFromOrder(this.order!);
      this.getDirections();
    });
  }

  load(): Observable<null> {
    return this.driverService.currentOrder(this.user()!.id).pipe(
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

  updateStatus(order_status: string){
    this.orderService.updateStatus(order_status, this.order!.id)
      .subscribe(data => {
        this.order = data;
        console.log(this.order);
      })
  }
}
