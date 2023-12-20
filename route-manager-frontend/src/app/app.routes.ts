import { Routes } from '@angular/router';
import { AddRoutePageComponent } from './pages/add-route-page/add-route-page.component';
import { MyRoutesPageComponent } from './pages/my-routes-page/my-routes-page.component';
import {MyAccountPageComponent} from "./pages/my-account-page/my-account-page.component";

export const routes: Routes = [
    { path: 'add-route', component: AddRoutePageComponent },
    { path: 'my-routes', component: MyRoutesPageComponent },
    { path: 'my-account', component: MyAccountPageComponent },
];
