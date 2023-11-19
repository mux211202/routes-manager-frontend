import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent, PlaceSearchResult } from '../../components/autocomplete/autocomplete.component';
import { MapDisplayComponent } from '../../components/map-display/map-display.component';
import { PlaceDetailsCardComponent } from '../../components/place-details-card/place-details-card.component';

@Component({
  selector: 'app-add-route-page',
  standalone: true,
  imports: [
    CommonModule, 
    AutocompleteComponent,
    PlaceDetailsCardComponent,
    MapDisplayComponent
  ],
  template: `
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
  styleUrl: './add-route-page.component.scss'
})
export class AddRoutePageComponent {
  fromValue: PlaceSearchResult | undefined;
  toValue: PlaceSearchResult | undefined;
}
