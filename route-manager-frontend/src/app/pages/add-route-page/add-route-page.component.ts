import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutocompleteComponent, PlaceSearchResult} from '../../components/autocomplete/autocomplete.component';
import {MapDisplayComponent} from '../../components/map-display/map-display.component';
import {PlaceDetailsCardComponent} from '../../components/place-details-card/place-details-card.component';
import {MatButtonModule} from '@angular/material/button';
import {Store} from '@ngrx/store';
import {RouteType} from '../../store/routes-store/routes.reducer';
import {createRouteKey} from '../../helpers/createRouteKey';
import {MatTableModule} from '@angular/material/table';
import {AddRoutePageService} from "./add-route-page-service";
import {setNotification, unsetNotification} from "../../store/notification-store/notification.actions";
import {AccountType} from "../../store/auth-store/auth.reducer";
import {RouterLink, RouterLinkActive} from "@angular/router";

export interface NotificationType { message: string, status: 'warn' | 'accent' };

@Component({
  selector: 'app-add-route-page',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    PlaceDetailsCardComponent,
    MapDisplayComponent,
    MatButtonModule,
    MatTableModule,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    @if (!account?.email) {
      <main class="pleaseLogIn">
        <h1>To use service, you need to log in</h1>
        <a routerLink="/my-account" ariaCurrentWhenActive="page" routerLinkActive="active">LOG IN</a>
      </main>
    } @else {
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
    }
  `,
  styleUrls: ['../../app.component.scss', './add-route-page.component.scss'],
})

export class AddRoutePageComponent {
  fromValue: PlaceSearchResult | undefined;
  toValue: PlaceSearchResult | undefined;
  notification: NotificationType | undefined;
  routes: RouteType[] | undefined;
  account: AccountType | undefined;

  constructor(private store: Store<{ notification: {notification: NotificationType}, auth: { account: AccountType } }>, private service: AddRoutePageService) {
    this.store.select('notification').subscribe(res => {
      this.notification = res.notification;
    });

    this.store.select('auth').subscribe(res => {
      this.account = res.account;
    });
  }

  async addRoute(): Promise<void> {
    const {fromValue, toValue} = this;

    if (!fromValue?.address || !toValue?.address) {
      const notification: NotificationType = {message: 'Please select starting point and destination point!', status: 'warn'};
      this.store.dispatch(setNotification(notification));
      setTimeout(() => {
        this.store.dispatch(unsetNotification());
      }, 3000)
      return;
    }

    const route = createRouteKey({key: '', fromValue, toValue});

    if (fromValue.location && toValue.location) {
      this.service.addRoute(route);

      setTimeout(() => {
        this.store.dispatch(unsetNotification());
      }, 3000)
    }
  }
}
