import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { MapDisplayComponent } from '../../components/map-display/map-display.component';
import { PlaceDetailsCardComponent } from '../../components/place-details-card/place-details-card.component';
import { MatButtonModule } from '@angular/material/button';
import { RouteType } from '../../store/routes-store/routes.reducer';
import { Store } from '@ngrx/store';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-my-routes-page',
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
    @if (this.routes) {
      <table mat-table [dataSource]="routes" class="mat-elevation-z8">

        <!-- From Column -->
        <ng-container matColumnDef="from">
          <th mat-header-cell *matHeaderCellDef> From </th>
          <td mat-cell *matCellDef="let element">
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
}
