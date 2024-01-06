import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import {MyAccountFormComponent} from "../../components/my-account-form/my-account-form.component";
import {AccountType} from "../../store/auth-store/auth.reducer";
import {logOut} from "../../store/auth-store/auth.actions";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-my-account-page',
  standalone: true,
  imports: [
    CommonModule,
    MyAccountFormComponent,
    MatButtonModule
  ],
  template: `
    @if (account.email) {
      <h1>{{ account.email }}</h1>
      <button mat-raised-button (click)="logOutOnClick()">Log Out</button>
    } @else {
      <my-account-form></my-account-form>
    }
  `,
  styleUrl: './my-account-page.component.scss',
})
export class MyAccountPageComponent {
  account: AccountType

  constructor(private store: Store<{ auth: { account: AccountType } }>) {
    this.store.select('auth').subscribe(res => {
      this.account = res.account;
    });
  }

  protected logOutOnClick() {
    this.store.dispatch(logOut())
  };
}
