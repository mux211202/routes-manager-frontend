import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { MapDisplayComponent } from '../../components/map-display/map-display.component';
import { PlaceDetailsCardComponent } from '../../components/place-details-card/place-details-card.component';
import { MatButtonModule } from '@angular/material/button';
import { RouteType } from '../../store/routes-store/routes.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
    @for (route of routes$ | async; track route) {
      <li> {{ route.key }} </li>
    } @empty {
      <li> There are no items. </li>
    }
  `,
  styleUrl: './my-routes-page.component.scss',
})
export class MyRoutesPageComponent {
  routes$: Observable<RouteType[]>;
  
  constructor(private store: Store<{ routes: RouteType[] }>) {
    this.routes$ = store.select('routes');
  }
}
