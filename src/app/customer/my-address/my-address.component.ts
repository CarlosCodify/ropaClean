import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, computed, inject } from '@angular/core';
import { CustomerServices } from '../services/customer.service';
import { AuthService } from '../../auth/services/auth.service';
import { Address } from '../../interfaces/address_interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import mapboxgl, { Marker } from 'mapbox-gl';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html'
})
export class MyAddressComponent implements OnInit, AfterViewInit {

  private customerService = inject(CustomerServices);
  private authService = inject(AuthService);
  private fb = inject( FormBuilder );

  public user = computed(() => this.authService.currentUser() );
  public addresses: Address[] = [];
  public map?: Map;
  public markersCount:number = 0;
  public marker?: Marker;

  @ViewChild('map') divMap?: ElementRef;

  public myForm: FormGroup = this.fb.group({
    latitude: ['', [ Validators.required ]],
    longitude: ['', [ Validators.required ]],
    address: ['', [ Validators.required, Validators.maxLength(8) ]],
  });

  ngOnInit(): void {
    this.load();
    this.myForm.get('latitude')?.valueChanges.subscribe(lat => {
      if (this.marker) {
        const currentLng = this.marker.getLngLat().lng;
        this.marker.setLngLat({ lng: currentLng, lat });
      }
    });

    this.myForm.get('longitude')?.valueChanges.subscribe(lng => {
      if (this.marker) {
        const currentLat = this.marker.getLngLat().lat;
        this.marker.setLngLat({ lat: currentLat, lng });
      }
    });
  }

  load(){
    this.customerService.myAddress(this.user()!.id).subscribe(data => {
      this.addresses = data;
    })
  }

  create(){
    const { latitude, longitude, address } = this.myForm.value;
    this.customerService.createAddress(this.user()!.id, address, latitude, longitude).subscribe({
      next: () => {
        this.load();
      },
      error: ( ) => {}
     }
    )
  }

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybG9zaG9kemljIiwiYSI6ImNsbGZucnJ5azBzOG4zZGw2a3FjYjBpd3IifQ.MAJJoNIelfLsDRJ_GlLBzQ';
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-63.201041152478226, -17.76748594084425],
      zoom: 14,
    });

    this.map.on('click', (e: any) => {
      this.addMarker(e.lngLat);
    });
  }

  addMarker(coordinates: any) {
    if (this.markersCount > 0) {
      this.marker!.remove()
    }

    this.marker = new mapboxgl.Marker({
      color: 'red',
      draggable: true,
    })
      .setLngLat(coordinates)
      .addTo(this.map!);

    this.markersCount++;

    this.myForm.get('latitude')?.setValue(coordinates.lat);
    this.myForm.get('longitude')?.setValue(coordinates.lng);

    this.marker.on('drag', (e: any) => {
      const newCoordinates = e.target.getLngLat();
      this.myForm.get('latitude')?.setValue(newCoordinates.lat);
      this.myForm.get('longitude')?.setValue(newCoordinates.lng);
    });
  }

}
