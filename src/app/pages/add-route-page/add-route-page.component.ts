import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent, PlaceSearchResult } from '../../components/autocomplete/autocomplete.component';
import { MapDisplayComponent } from '../../components/map-display/map-display.component';
import { PlaceDetailsCardComponent } from '../../components/place-details-card/place-details-card.component';
import { MatButtonModule } from '@angular/material/button';
import { routeMatrixRequest } from '../../helpers/routeMatrixRequest';

const origins = [
  {
    "waypoint": {
      "location": {
        "latLng": {
          "latitude": 37.420761,
          "longitude": -122.081356
        }
      }
    },
    "routeModifiers": { "avoid_ferries": true}
  },
  {
    "waypoint": {
      "location": {
        "latLng": {
          "latitude": 37.403184,
          "longitude": -122.097371
        }
      }
    }
  }
];

const destinations = [
  {
    "waypoint": {
      "location": {
        "latLng": {
          "latitude": 37.420999,
          "longitude": -122.086894
        }
      }
    }
  },
  {
    "waypoint": {
      "location": {
        "latLng": {
          "latitude": 37.383047,
          "longitude": -122.044651
        }
      }
    }
  }
];

@Component({
  selector: 'app-add-route-page',
  standalone: true,
  imports: [
    CommonModule, 
    AutocompleteComponent,
    PlaceDetailsCardComponent,
    MapDisplayComponent,
    MatButtonModule
  ],
  template: `
    <div class="container">
      <div class="input-area"> 
        <h2>I want to go from</h2>
        <app-autocomplete (placeChanged)="fromValue = $event"></app-autocomplete>
        <h2>to</h2>
        <app-autocomplete (placeChanged)="toValue = $event"></app-autocomplete>
        <button (click)="onSave($event)" mat-raised-button color="primary">Add route</button>
      </div>
      @if(this.notification) {
        <div><button mat-raised-button color="warn">{{this.notification}}</button></div>
      }
      <div class="display-area"> 
        <div>
        <app-place-details-card [data]="fromValue"></app-place-details-card>
        <app-place-details-card [data]="toValue"></app-place-details-card>
        </div>
        <app-map-display [from]="fromValue" [to]="toValue"></app-map-display>
      </div>
    </div>
  `,
  styleUrl: './add-route-page.component.scss'
})
export class AddRoutePageComponent {
  fromValue: PlaceSearchResult | undefined;
  toValue: PlaceSearchResult | undefined;
  notification: string | undefined;
  
  async onSave(event: MouseEvent): Promise<void> {
    console.log(this.fromValue, this.toValue);
    if (!this.fromValue?.address || !this.toValue?.address) {
      this.notification = 'Please select starting point and destination point!';
      return;
    }
    this.notification = undefined;
    routeMatrixRequest(origins, destinations);
  }
}
