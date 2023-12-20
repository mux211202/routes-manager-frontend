import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {setAccount} from "../../store/auth-store/auth.actions";
import {Store} from "@ngrx/store";
import {RouteType} from "../../store/routes-store/routes.reducer";

@Injectable({
  providedIn: 'root'
})
export class MyAccountFormService {

  constructor(private http: HttpClient,
              private store: Store<{ routes: RouteType[] }>) { }

  register(userData: any): void
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post('http://localhost:1337/api/v1/auth/register', userData, { headers, observe: 'response' })
    .subscribe(
      (response: HttpResponse<any>) => {
        const { token } = response.body;
        localStorage.setItem('jwtToken', token);
        const helper = new JwtHelperService();

        const user = helper.decodeToken(token);

        this.store.dispatch(setAccount(user))
        console.log(user);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  login(userData: any): void
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post('http://localhost:1337/api/v1/auth/login', userData, { headers, observe: 'response' })
    .subscribe(
      (response: HttpResponse<any>) => {
        const { token } = response.body;
        localStorage.setItem('jwtToken', token);
        const helper = new JwtHelperService();

        const user = helper.decodeToken(token);

        this.store.dispatch(setAccount(user))
        console.log(user);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
