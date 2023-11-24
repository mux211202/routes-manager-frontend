import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent, PlaceSearchResult } from '../../components/autocomplete/autocomplete.component';
import { MapDisplayComponent } from '../../components/map-display/map-display.component';
import { PlaceDetailsCardComponent } from '../../components/place-details-card/place-details-card.component';
import { MatButtonModule } from '@angular/material/button';
import { routeMatrixRequest } from '../../helpers/routeMatrixRequest';
import { AddRoutePageComponent } from '../add-route-page/add-route-page.component';

export interface RouteType {
  key?: string,
  fromValue: PlaceSearchResult | undefined,
  toValue: PlaceSearchResult | undefined
}

@Component({
  selector: 'app-my-routes-page',
  standalone: true,
  imports: [
    CommonModule, 
    AutocompleteComponent,
    PlaceDetailsCardComponent,
    MapDisplayComponent,
    MatButtonModule
  ],
  template: `
    hello
  `,
  styleUrl: './my-routes-page.component.scss',
  providers: [AddRoutePageComponent]
})
export class MyRoutesPageComponent {
  routesList: RouteType[] = [];

  addRoute(route: RouteType) {
    console.log('adding route');
    if (route.fromValue?.location && route.toValue?.location) {
      const key = route.fromValue.location.lat.toString() + 
      route.fromValue.location.lng.toString() +
      route.toValue.location.lat.toString() +
      route.toValue.location.lng.toString();

      this.routesList.push({key, ...route});
      console.log(this.routesList);
    }
  }
  //PlaceSearchResult
}
