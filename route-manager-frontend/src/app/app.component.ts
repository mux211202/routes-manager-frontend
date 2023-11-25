import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    SimpleNotificationsModule
  ],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <simple-notifications></simple-notifications>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: 'routes-manager-frontend';
}
