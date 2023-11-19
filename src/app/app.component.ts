import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent, PlaceSearchResult } from './components/autocomplete/autocomplete.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PlaceDetailsCardComponent } from './components/place-details-card/place-details-card.component';
import { MapDisplayComponent } from './components/map-display/map-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    MatToolbarModule, 
    PlaceDetailsCardComponent,
    MapDisplayComponent
  ],
  template: `
    <mat-toolbar color="primary">
      Select Address
    </mat-toolbar>
    <div class="container">
      <div class="input-area"> 
        <h2>I want to go from</h2>
        <app-autocomplete (placeChanged)="fromValue = $event"></app-autocomplete>
        <h2>to</h2>
        <app-autocomplete (placeChanged)="toValue = $event"></app-autocomplete>
      </div>
      <div class="display-area"> 
        <div>
          <app-place-details-card [data]="fromValue"></app-place-details-card>
          <app-place-details-card [data]="toValue"></app-place-details-card>
        </div>
        <app-map-display [from]="fromValue" [to]="toValue"></app-map-display>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: 'routes-manager-frontend';
  fromValue: PlaceSearchResult | undefined;
  toValue: PlaceSearchResult | undefined;
}
