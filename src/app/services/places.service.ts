import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places_interface';
import { MapService } from './map.service';
import { PlacesApiClient } from '../api/placesApiClient';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesApi = inject(PlacesApiClient);
  private mapService = inject(MapService);
  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor( ) { this.getUserLocation() }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise ( ( resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ( { coords } ) => {
          this.userLocation = [ coords.longitude, coords.latitude ];
          resolve( this.userLocation );
        },
        ( err ) => {
          alert('No se pudo obtener la geolocalización')
          console.log(err);
          reject();
        }
      )
    } )
  }

  getPlacesByQuery( query: string ){
    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${ query }.json`, { params: { proximity: this.userLocation!.join(',') } })
      .subscribe( resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkersFromPlaces( this.places, this.userLocation! );
      });
  }

  deletePlaces() {
    this.places = [];
  }
}
