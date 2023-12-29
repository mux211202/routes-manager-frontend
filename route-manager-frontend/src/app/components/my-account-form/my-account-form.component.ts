import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatTabChangeEvent, MatTabsModule} from "@angular/material/tabs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MyAccountFormService} from "./my-account-form-service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

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
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="form-container">
      <mat-tab-group (selectedTabChange)="switchTab($event)">
        <mat-tab label="Login">
          <ng-template mat-tab-label>
            <mat-icon color="primary">login</mat-icon>
            <span class="primary-color">Login</span>
          </ng-template>
          <form [formGroup]="form" (submit)="submitForm($event)">
            <div class="inputs">
              <label for="email">Email:</label>
              <input class="form-input" matInput type="text" id="email" name="email" required formControlName="email">
              <label for="password">Password:</label>
              <input class="form-input" matInput type="password" id="password" name="password" required
                     formControlName="password">
            </div>
            <button mat-raised-button type="submit">Login</button>
          </form>
        </mat-tab>

        <mat-tab label="Register">
          <ng-template mat-tab-label>
            <mat-icon color="primary">person_add</mat-icon>
            <span class="primary-color">Register</span>
          </ng-template>
          <form [formGroup]="form" (submit)="submitForm($event)">
            <div class="inputs">
              <label for="firstname">Firstname:</label>
              <input class="form-input" matInput type="text" id="firstname" name="firstname" required
                     formControlName="firstname">
              <label for="secondname">Second name:</label>
              <input class="form-input" matInput type="text" id="secondname" name="secondname" required
                     formControlName="secondname">
              <label for="email">Email:</label>
              <input class="form-input" matInput type="email" id="email" name="email" required formControlName="email">
              <label for="password">Password:</label>
              <input class="form-input" matInput type="password" id="password" name="password" required
                     formControlName="password">
            </div>
            <button mat-raised-button type="submit">Register</button>
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

  switchTab(event: MatTabChangeEvent) {
    this.activeTab = event.index === 0 ? 'login' : 'register';
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
    if (this.activeTab === 'register') {
      this.formService.register(this.form.value);
    } else {
      this.formService.login(this.form.value);
    }
  }
}
