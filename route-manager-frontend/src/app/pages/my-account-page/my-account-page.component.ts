import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {MyAccountFormComponent} from "../../components/my-account-form/my-account-form.component";
import {AccountType} from "../../store/auth-store/auth.reducer";

@Component({
  selector: 'app-my-account-page',
  standalone: true,
  imports: [
    CommonModule,
    MyAccountFormComponent,
  ],
  template: `
    @if(account?.email) {
        <h1>{{account.email}}</h1>
    } @else {
        <my-account-form></my-account-form>
    }
  `,
  styleUrl: './my-account-page.component.scss',
})
export class MyAccountPageComponent {
  account: AccountType
  constructor(private store: Store<{ auth: {account: AccountType} }>) {
    this.store.select('auth').subscribe(res => {
      console.log(res)
      this.account = res.account;
    });
  }
}
