import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent, PlaceSearchResult } from './components/autocomplete/autocomplete.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    MatToolbarModule
  ],
  template: `
    <mat-toolbar color="primary">
      Select Address
    </mat-toolbar>
    <div class="container">
      <app-autocomplete (placeChanged)="formValue = $event"></app-autocomplete>
      @if (formValue) {
        <div>
          {{ formValue.name }}
        </div>
      }
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formValue: PlaceSearchResult | undefined;
}
