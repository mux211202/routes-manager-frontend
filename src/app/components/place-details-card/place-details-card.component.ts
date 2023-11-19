import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PlaceSearchResult } from '../autocomplete/autocomplete.component';

@Component({
  selector: 'app-place-details-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    @if(data?.address) {
      <mat-card>
        <img class="place-image" [src]="data?.imageUrl" alt="place-image" mat-card-image>
        <mat-card-header>
          <img [src]="data?.iconUrl" mat-card-avatar/>
          <mat-card-title>{{ data?.name }}</mat-card-title>
        </mat-card-header>
      </mat-card>
    }
`,
  styleUrl: './place-details-card.component.scss'
})
export class PlaceDetailsCardComponent {
  @Input() data: PlaceSearchResult | undefined;
}
