import { Injectable, inject } from '@angular/core';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { DirectionsResponse, Route } from '../interfaces/directions_interface';
import { Driver } from '../admin/drivers/interfaces/driver.interface';
import { Order } from '../interfaces/order_interface';
import { DirectionsApiClient } from '../api/directionsApiClient';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private directionsApi = inject(DirectionsApiClient);

  private map?: Map;

  private markers: Marker[] = [];

  get isMapReady(){
    return !!this.map;
  }

  setMap( map: Map) {
    this.map = map;
  }

  createMarkersFromOrder( order: Order ){
    if ( !this.map ) return;

    this.markers.forEach( marker => marker.remove() );
    const newMarkers = [];

    const pickup_latitude = Number(order.pickup_address.latitude);
    const pickup_longitude = Number(order.pickup_address.longitude);
    const popup_pickup = new Popup()
      .setHTML(`
          <h6>Lugar de recojo</h6>
          <span>${ order.pickup_address.address }</span>
        `);
    const newMarkerPickup = new Marker({color: 'red'})
      .setLngLat([pickup_longitude, pickup_latitude])
      .setPopup(popup_pickup)
      .addTo(this.map);

    newMarkers.push( newMarkerPickup );

    const driver_latitude = Number(order.driver.latitude);
    const driver_longitude = Number(order.driver.longitude);
    const popupDriver = new Popup()
      .setHTML(`
          <h6>Conductor</h6>
          <span>${ order.driver.person.first_name + ' ' + order.driver.person.last_name }</span>
        `);
    const newMarkerDriver = new Marker({color: 'blue'})
      .setLngLat([driver_longitude, driver_latitude])
      .setPopup(popupDriver)
      .addTo(this.map);

    newMarkers.push( newMarkerDriver );

    const delivery_latitude = Number(order.delivery_address.latitude);
    const delivery_longitude = Number(order.delivery_address.longitude);
    const popupDelivery = new Popup()
      .setHTML(`
          <h6>Lugar de entrega</h6>
          <span>${ order.delivery_address.address }</span>
        `);
    const newMarkerDelivery = new Marker({color: 'green'})
      .setLngLat([delivery_longitude, delivery_latitude])
      .setPopup(popupDelivery)
      .addTo(this.map);

    newMarkers.push( newMarkerDelivery );

    this.markers = newMarkers;
  }

  createMarkersFromDrivers( drivers: Driver[]){
    if ( !this.map ) return;

    this.markers.forEach( marker => marker.remove() );
    const newMarkers = [];

    for( const driver of drivers ) {
      const { longitude, latitude } = driver;
      const popup = new Popup()
      .setHTML(`
          <h6>Conductor</h6>
          <span>${ driver.first_name + ' ' + driver.last_name}</span>
        `);
      const newMarker = new Marker()
        .setLngLat([Number(longitude), Number(latitude)])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push( newMarker );
    }
    this.markers = newMarkers;
  }

  getRouteBetweenPoints( start: [number, number], end: [number, number] ) {
    this.directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`)
      .subscribe( resp => {
        this.drawPolyline(resp.routes[0])
      } )
  }

  private drawPolyline( route: Route){
    const coords = route.geometry.coordinates;

    // Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if ( this.map?.getLayer('RouteString') ) {
      this.map?.removeLayer('RouteString');
      this.map?.removeSource('RouteString');
    }


    this.map?.addSource('RouteString', sourceData );

    this.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join':'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });
  }
}
