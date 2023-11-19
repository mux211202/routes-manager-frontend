import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
let map: google.maps.Map;
let marker: google.maps.Marker;
let geocoder: google.maps.Geocoder;
let responseDiv: HTMLDivElement;
let response: HTMLPreElement;

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));