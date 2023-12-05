import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteType } from '../../store/routes-store/routes.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-my-account-page',
  standalone: true,
  imports: [
    CommonModule, 
  ],
  template: `
  `,
  styleUrl: './my-account-page.component.scss',
})
export class MyAccountPageComponent {
  routes: RouteType[] | undefined;
  displayedColumns: string[] = ['from', 'to'];
  
  constructor(private store: Store<{ routes: RouteType[] }>) {
    
  }
}
