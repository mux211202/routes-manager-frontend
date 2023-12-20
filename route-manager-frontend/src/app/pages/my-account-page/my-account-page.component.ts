import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteType } from '../../store/routes-store/routes.reducer';
import { Store } from '@ngrx/store';
import {MyAccountFormComponent} from "../../components/my-account-form/my-account-form.component";

@Component({
  selector: 'app-my-account-page',
  standalone: true,
  imports: [
    CommonModule,
    MyAccountFormComponent,
  ],
  template: `
    <my-account-form></my-account-form>
  `,
  styleUrl: './my-account-page.component.scss',
})
export class MyAccountPageComponent {
  routes: RouteType[] | undefined;
  displayedColumns: string[] = ['from', 'to'];

  constructor(private store: Store<{ routes: RouteType[] }>) {

  }
}
