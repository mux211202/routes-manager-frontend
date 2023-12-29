import {Component, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaceSearchResult} from '../autocomplete/autocomplete.component';
import {
  GoogleMap,
  GoogleMapsModule,
  MapDirectionsService,
} from '@angular/google-maps';
import {map} from 'rxjs';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <google-map #map [center]="this.rigaLocation" [zoom]="zoom" width="100%" height="100%">
      @if (directionsResult) {
        <map-directions-renderer [directions]="directionsResult"></map-directions-renderer>
      }
      @if (markerPosition) {
        <map-marker [position]="markerPosition"></map-marker>
      }
    </google-map>
  `,
  styleUrl: './map-display.component.scss'
})
export class MapDisplayComponent {
  @Input() from: PlaceSearchResult | undefined;
  @Input() to: PlaceSearchResult | undefined;
  @ViewChild('map', {static: true}) map: GoogleMap;

  zoom = 10;

  rigaLocation = {
    lat: 56.9676941,
    lng: 24.1056221
  }

  directionsResult: google.maps.DirectionsResult | undefined;

  markerPosition: google.maps.LatLng | undefined;

  constructor(private directionsService: MapDirectionsService) {
  }

  ngOnChanges() {
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;

    if (fromLocation && toLocation) {
      this.getDirections(fromLocation, toLocation);
    } else if (fromLocation && !toLocation) {
      this.goToLocation(fromLocation);
    } else if (!fromLocation && toLocation) {
      this.goToLocation(toLocation);
    }
  }

  goToLocation(location: google.maps.LatLng) {
    this.markerPosition = location;
    this.map.panTo(location);
    this.zoom = 17;
    this.directionsResult = undefined;
  }

  getDirections(from: google.maps.LatLng, to: google.maps.LatLng,) {
    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING
    }

    this.directionsService.route(request).pipe(
      map(res => res.result)
    ).subscribe(result => {
      this.directionsResult = result;
      this.markerPosition = undefined;
    })
  }
}
