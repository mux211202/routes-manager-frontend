import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {isLoggedIn} from "./helpers/isLoggedIn";
import {logOut, setAccount} from "./store/auth-store/auth.actions";
import {Store} from "@ngrx/store";

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
  title: 'routes-manager';

  constructor(private store: Store) {
  }

  ngOnInit() {
    const email = isLoggedIn();

    if (email) {
      this.store.dispatch(setAccount({email}))
    } else {
      this.store.dispatch(logOut())
    }
  }
}
