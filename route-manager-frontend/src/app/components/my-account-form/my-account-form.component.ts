import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatTabsModule} from "@angular/material/tabs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MyAccountFormService} from "./my-account-form-service";

@Component({
  selector: 'my-account-form',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div>
      <mat-tab-group>
        <mat-tab label="Login">
          <ng-template mat-tab-label>
            <mat-icon color="primary">login</mat-icon>
            <span class="primary-color">Login</span>
          </ng-template>
          <form [formGroup]="form" (submit)="submitForm($event)">
            <div>
              <label for="email">Email:</label>
              <input type="text" id="email" name="email" required formControlName="email">
            </div>
            <div>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required formControlName="password">
            </div>

            <button type="submit">Login</button>
          </form>
        </mat-tab>

        <mat-tab label="Register">
          <ng-template mat-tab-label>
            <mat-icon color="primary">person_add</mat-icon>
            <span class="primary-color">Register</span>
          </ng-template>
          <form [formGroup]="form" (submit)="submitForm($event)">
            <div>
              <label for="firstname">Firstname:</label>
              <input type="text" id="firstname" name="firstname" required formControlName="firstname">
            </div>
            <div>
              <label for="secondname">Second name:</label>
              <input type="text" id="secondname" name="secondname" required formControlName="secondname">
            </div>
            <div>
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required formControlName="email">
            </div>
            <div>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required formControlName="password">
            </div>

            <button type="submit">Register</button>
          </form>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styleUrl: './my-account-form.component.scss'
})
export class MyAccountFormComponent {
  @Output() submitFormEmitter = new EventEmitter<any>();
  activeTab: 'login' | 'register' = 'login';
  form: FormGroup;

  switchTab(tab: 'login' | 'register') {
    console.log('switching')
    this.activeTab = tab;
  }

  constructor(private fb: FormBuilder,
              private formService: MyAccountFormService) {
    this.form = this.fb.group({
      firstname: [],
      secondname: [],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async submitForm(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.activeTab, this.form.value);
   if (this.form.value.firstname) {
      console.log('here')
      this.formService.register(this.form.value);
   } else {
     this.formService.login(this.form.value);
   }
  }
}
