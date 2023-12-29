import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutocompleteComponent, PlaceSearchResult} from '../../components/autocomplete/autocomplete.component';
import {MapDisplayComponent} from '../../components/map-display/map-display.component';
import {PlaceDetailsCardComponent} from '../../components/place-details-card/place-details-card.component';
import {MatButtonModule} from '@angular/material/button';
import {Store} from '@ngrx/store';
import {RouteType} from '../../store/routes-store/routes.reducer';
import {addRoute} from '../../store/routes-store/routes.actions';
import {createRouteKey} from '../../helpers/createRouteKey';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-add-route-page',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    PlaceDetailsCardComponent,
    MapDisplayComponent,
    MatButtonModule,
    MatTableModule
  ],
  template: `
    <div class="container">
      <div class="input-area">
        <h2>Warehouse location: </h2>
        <app-autocomplete (placeChanged)="fromValue = $event"></app-autocomplete>
        <h2>Destination point: </h2>
        <app-autocomplete (placeChanged)="toValue = $event"></app-autocomplete>
        <button (click)="addRoute()" mat-raised-button color="primary">Add route</button>
      </div>
      @if (this.notification) {
        <div>
          <button mat-raised-button color={{this.notification.status}}>{{ this.notification.message }}</button>
        </div>
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
  notification: { message: string, status: 'warn' | 'accent' } | undefined;
  routes: RouteType[] | undefined;

  constructor(private store: Store<{ routes: RouteType[] }>) {
    this.store.select('routes').subscribe(res => {
      this.routes = res;
    });
  }

  addRoute(): void {
    const {fromValue, toValue} = this;

    if (!fromValue?.address || !toValue?.address) {
      this.notification = {message: 'Please select starting point and destination point!', status: 'warn'};
      return;
    }

    const route = createRouteKey({key: '', fromValue, toValue});
    if (!!this.routes?.find(storeRoute => route.key === storeRoute.key)) {
      this.notification = {message: 'This route already exists!', status: 'warn'};
      return;
    }

    this.notification = undefined;

    if (fromValue.location && toValue.location) {
      this.store.dispatch(addRoute({route}));
      const message = 'This you have added the route!';
      this.notification = {message, status: 'accent'};
      setTimeout(() => {
        // checking if notification did not change
        if (this.notification?.message === message) this.notification = undefined;
      }, 3000)
    }
  }
}
