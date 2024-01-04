import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Store} from "@ngrx/store";
import {environment} from "../../../environments/environment";
import {addRoute} from '../../store/routes-store/routes.actions';
import {RouteType} from "../../store/routes-store/routes.reducer";
import {parseRoutesForRequest} from "../../helpers/parseRoutesForRequest";

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
          console.log(response)
          this.store.dispatch(addRoute({route}))
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
