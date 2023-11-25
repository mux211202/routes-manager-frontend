import { Routes } from '@angular/router';
import { AddRoutePageComponent } from './pages/add-route-page/add-route-page.component';
import { MyRoutesPageComponent } from './pages/my-routes-page/my-routes-page.component';

export const routes: Routes = [
    { path: 'add-route', component: AddRoutePageComponent },
    { path: 'my-routes', component: MyRoutesPageComponent },
];
