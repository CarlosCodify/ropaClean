import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Map} from 'mapbox-gl';
import { MapService } from '../../../services/map.service';
import mapboxgl from 'mapbox-gl';
import { DriverServices } from '../../../admin/services/driver.service';
import { Driver } from '../../../admin/drivers/interfaces/driver.interface';
import { Observable, map } from 'rxjs';
import { Resume } from '../../../interfaces/resume_interface';

@Component({
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit, AfterViewInit {
  private mapService = inject(MapService);
  private driverService = inject(DriverServices);

  public resume?: Resume;

  public drivers?: Driver[];

  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;

  ngOnInit(): void {
    this.load().subscribe(() => {
      this.mapService.createMarkersFromDrivers(this.drivers!)
    });
    this.driverService.resume().subscribe(data => this.resume = data);
  }

  load(): Observable<null> {
    return this.driverService.list().pipe(
      map(data => {
        this.drivers = data;
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
}
