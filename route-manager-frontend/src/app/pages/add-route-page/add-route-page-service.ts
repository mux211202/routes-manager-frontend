import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Store} from "@ngrx/store";
import {environment} from "../../../environments/environment";
import {RouteType} from "../../store/routes-store/routes.reducer";
import {parseRoutesForRequest} from "../../helpers/parseRoutesForRequest";
import {setNotification} from "../../store/notification-store/notification.actions";
import {NotificationType} from "./add-route-page.component";

@Injectable({
  providedIn: 'root'
})
export class AddRoutePageService {

  constructor(private http: HttpClient,
              private store: Store) {
  }

  addRoute(route: RouteType): void {
    const newRoute = parseRoutesForRequest(route);
    const token = localStorage.getItem('jwtToken') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post(environment.apiUrl + '/api/v1/route/save', newRoute, {headers, observe: 'response'})
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.body.info === 'Saved'){
            const message = 'You have added the route!';
            const notification: NotificationType = {message, status: "accent"};
            this.store.dispatch(setNotification(notification))
          } else if(response.body.info === 'Already Saved Route') {
            const notification: NotificationType = {message: 'This route already exists!', status: 'warn'};
            this.store.dispatch(setNotification(notification));
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
