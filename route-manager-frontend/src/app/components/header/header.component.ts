import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <header> 
        <div>
          <a href="/">
            <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
          </a>
          <a href="/add-route">Add new route</a>
          <a href="/my-routes">My routes</a>
        </div>
        <div>
          <a href="/my_account">
            <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="account_box"></mat-icon>
          </a>
        </div>
      </header>
    </mat-toolbar>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
