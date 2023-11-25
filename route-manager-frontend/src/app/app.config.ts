import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreModule, provideStore } from '@ngrx/store';
import { routesReducer } from './store/routes-store/routes.reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore(),
    importProvidersFrom(
      StoreModule.forRoot({ routes: routesReducer }),
      StoreDevtoolsModule.instrument({
        name: 'NgRx Demo App',
      })
    )
]
};
