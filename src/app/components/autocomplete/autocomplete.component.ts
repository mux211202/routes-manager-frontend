import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Input } from '@angular/core';

export interface PlaceSearchResult {
  address: string;
  name: string | undefined,
  location?: google.maps.LatLng,
  imageUrl?: string,
  iconUrl?: string | undefined,
}

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field>
      <input #inputField matInput [placeholder]="placeholder">
    </mat-form-field>
  `,
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {
  @ViewChild('inputField') inputField: ElementRef;

  @Input() placeholder = '';
  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  ngAfterViewInit() {
    console.log(google.maps.places)
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      const result: PlaceSearchResult = {
        address: this.inputField.nativeElement.value,
        name: place?.name,
        location: place?.geometry?.location,
        iconUrl: place?.icon,
        imageUrl: this.getPhotoUrl(place)
      }
      this.placeChanged.emit(result);
    })
  }

  getPhotoUrl(place: google.maps.places.PlaceResult | undefined): string | undefined {
    return place?.photos && place.photos?.length > 0 ? place?.photos[0].getUrl({ maxWidth: 500 }) : undefined;
  }
}
