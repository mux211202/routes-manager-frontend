import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatIconModule, 
    RouterLink, 
    RouterLinkActive
  ],
  template: `
    <mat-toolbar color="primary">
      <header> 
        <div>
          <a routerLink="/"  routerLinkActive="active" ariaCurrentWhenActive="page">
            <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
          </a>
          <a routerLink="/add-route" ariaCurrentWhenActive="page" routerLinkActive="active">Add new route</a>
          <a routerLink="/my-routes" ariaCurrentWhenActive="page" routerLinkActive="active">My routes</a>
        </div>
        <div>
          <a routerLink="/my-account" ariaCurrentWhenActive="page" routerLinkActive="active">
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
