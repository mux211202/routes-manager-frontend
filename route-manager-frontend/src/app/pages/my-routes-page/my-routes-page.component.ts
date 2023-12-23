import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { MapDisplayComponent } from '../../components/map-display/map-display.component';
import { PlaceDetailsCardComponent } from '../../components/place-details-card/place-details-card.component';
import { MatButtonModule } from '@angular/material/button';
import { RouteType } from '../../store/routes-store/routes.reducer';
import { Store } from '@ngrx/store';
import {MatTableModule} from '@angular/material/table';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {parseRoutesForRouteMatrix, routeMatrixRequest} from "../../helpers/routeMatrix";

const dummyRoutes = [
  {
    key: '56.929983224.2067285999999956.941553724.016837',
    fromValue: {
      address: 'Maxima XXX, Andreja Saharova iela, Latgale Suburb, Riga, Latvia',
      name: 'Maxima XXX',
      location: {
        lat: () =>  56.9415537,
        lng: () => 24.20672859999999
      },
      iconUrl: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
      imageUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAWU5eFiWDOs11MMnh7U1-DaADyni8uwW-uf6W0tMRAJ2AmHniGeKK42vP9vv7fKgqAOqEJFum4ojqEOd6StBjmCku7vBw8y-WSdySYHgoozUhLoA2f-hhUuL35Nh4u7LVuwd9k-12kBmAHuW4nWpgwc6nloPN4Z_VrKE1NsP-Zz86Z0hP0Oy&3u500&5m1&2e1&callback=none&key=AIzaSyApgS9bmdfRrOvGT8544t1xetPRFEuYfT4&token=80624'
    },
    toValue: {
      address: 'Depo, Kārļa Ulmaņa gatve, Zemgale Suburb, Riga, Latvia',
      name: 'Depo',
      location: {
        lat: () =>  56.9299832,
        lng: () =>  24.016837
      },
      iconUrl: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
      imageUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAWU5eFg-OVy6pZ8BjbP-YQBbXHbE3yPxMiCLms5mYRxVTVu1bZ1vU2cAcWbAenRd23Xsx6ghY5Q2qccNyYr9XRhHL2l9KMzPwjyTq9QjAosxJk16kV4NYW66vIggZaiZQgkIA6Y8L_85Z3ZJd6fht8LJ0FAvwhlfARtMl_KSDKx5BdgYb2nf&3u500&5m1&2e1&callback=none&key=AIzaSyApgS9bmdfRrOvGT8544t1xetPRFEuYfT4&token=58586'
    }
  },
    {
      key: '56.937403124.2067285999999956.941553724.1352262',
      fromValue: {
        address: 'Maxima XXX, Andreja Saharova iela, Latgale Suburb, Riga, Latvia',
        name: 'Maxima XXX',
        location: {
          lat: () => 56.9415537,
          lng: () =>  24.20672859999999
        },
        iconUrl: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
        imageUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAWU5eFiWDOs11MMnh7U1-DaADyni8uwW-uf6W0tMRAJ2AmHniGeKK42vP9vv7fKgqAOqEJFum4ojqEOd6StBjmCku7vBw8y-WSdySYHgoozUhLoA2f-hhUuL35Nh4u7LVuwd9k-12kBmAHuW4nWpgwc6nloPN4Z_VrKE1NsP-Zz86Z0hP0Oy&3u500&5m1&2e1&callback=none&key=AIzaSyApgS9bmdfRrOvGT8544t1xetPRFEuYfT4&token=80624'
      },
      toValue: {
        address: 'DEPO, Krasta iela, Latgale Suburb, Riga, Latvia',
        name: 'Depo DIY',
        location: {
          lat: () => 56.9374031,
          lng: () => 24.1352262
        },
        iconUrl: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
        imageUrl: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAWU5eFgU8WKoQO3rNrzQzXLTkIkqJlI3oSUDbpSEzAH37idkdnMsD5VY9QFzZ4ZepVjkW6xlKevuJqXZ35FYMihasCtBVrau6HoAIxEbHdEwo2dbxGewuoPO67Enlmx6nK0rGRYTuYSWevstM4qxQHXfVQcrAbsHL5WwoZM-Wkn0ddiLwhBV&3u500&5m1&2e1&callback=none&key=AIzaSyApgS9bmdfRrOvGT8544t1xetPRFEuYfT4&token=3750'
      }
    },
  ];

@Component({
  selector: 'app-my-routes-page',
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
    @if (this.routes) {
      <table mat-table [dataSource]="dummyRoutes" class="mat-elevation-z8">

        <!-- From Column -->
        <ng-container matColumnDef="from">
          <th mat-header-cell *matHeaderCellDef> From </th>
          <td mat-cell *matCellDef="let element">
            <input (click)="onCheckboxClick($event)" [attr.data-id]="element.key" type="checkbox"/>
            <img [src]="element.fromValue.iconUrl" mat-card-avatar/>
            <span>{{element.fromValue.address}}</span>
          </td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="to">
          <th mat-header-cell *matHeaderCellDef> To </th>
          <td mat-cell *matCellDef="let element">
            <img [src]="element.toValue.iconUrl" mat-card-avatar/>
            <span>{{element.toValue.address}}</span>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <button (click)="planRoutes()" mat-raised-button> See the most effective routes </button>
      <button mat-raised-button>
        <a routerLink="/add-route" ariaCurrentWhenActive="page" routerLinkActive="active">Add new route</a>
      </button>

    } @else {
      <h2>There are no routes</h2>
    }
  `,
  styleUrl: './my-routes-page.component.scss',
})
export class MyRoutesPageComponent {
  routes: RouteType[] | undefined;
  displayedColumns: string[] = ['from', 'to'];

  constructor(private store: Store<{ routes: RouteType[] }>) {
    this.store.select('routes').subscribe(res => {
      this.routes = res;
    });
  }

  protected readonly dummyRoutes = dummyRoutes;
  protected selectedRoutes: string[] = [];

  onCheckboxClick = (event: Event) => {
    if(event.target) {
      const target = event.target as HTMLElement;
      const routeId = target.getAttribute('data-id') || '';
      if(!this.selectedRoutes.includes(routeId)) {
        this.selectedRoutes.push(routeId);
      } else {
        const indexToRemove: number = this.selectedRoutes.indexOf(routeId);

        if (indexToRemove !== -1) {
          this.selectedRoutes.splice(indexToRemove, 1);
        }
      }
    }
  }

  planRoutes = () => {
    const routes = this.selectedRoutes.map(
      routeId => dummyRoutes.find(route => routeId === route.key)
    )
    const parsedRoutes= parseRoutesForRouteMatrix(routes);
    if(!!parsedRoutes) {
      const plan = routeMatrixRequest(parsedRoutes.origins, parsedRoutes.destinations);
      console.log(parsedRoutes)
      console.log(plan);
    }
  }
}
