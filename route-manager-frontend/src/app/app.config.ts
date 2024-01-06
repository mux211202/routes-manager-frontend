import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {StoreModule, provideStore} from '@ngrx/store';
import {routesReducer} from './store/routes-store/routes.reducer';
import {authReducer} from './store/auth-store/auth.reducer';

import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {HttpClientModule} from "@angular/common/http";
import {notificationReducer} from "./store/notification-store/notification.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore(),
    importProvidersFrom(
      StoreModule.forRoot({routes: routesReducer, auth: authReducer, notification: notificationReducer}),
      StoreDevtoolsModule.instrument({
        name: 'NgRx Demo App',
      }),
      SimpleNotificationsModule.forRoot(),
      HttpClientModule
    ),
  ]
};
