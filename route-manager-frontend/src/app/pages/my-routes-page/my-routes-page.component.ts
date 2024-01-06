import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutocompleteComponent} from '../../components/autocomplete/autocomplete.component';
import {MapDisplayComponent} from '../../components/map-display/map-display.component';
import {PlaceDetailsCardComponent} from '../../components/place-details-card/place-details-card.component';
import {MatButtonModule} from '@angular/material/button';
import {RouteType} from '../../store/routes-store/routes.reducer';
import {Store} from '@ngrx/store';
import {MatTableModule} from '@angular/material/table';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {parseRouteForPlanning, routeMatrixRequest, routesPlannerResult} from "../../helpers/routeMatrix";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {hasSameOrigin} from "../../helpers/hasSameOrigin";
import {routes} from "../../app.routes";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {parseRoutesForFrontend} from "../../helpers/parseRoutesForRequest";
import {AccountType} from "../../store/auth-store/auth.reducer";
import {MyAccountFormComponent} from "../../components/my-account-form/my-account-form.component";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-my-routes-page',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    PlaceDetailsCardComponent,
    MapDisplayComponent,
    MatButtonModule,
    MatTableModule,
    RouterLink,
    RouterLinkActive,
    MatDialogModule,
    MyAccountFormComponent,
    MatIconModule
  ],
  template: `
    @if (!account?.email) {
      <main class="pleaseLogIn">
        <h1>To use service, you need to log in</h1>
        <a routerLink="/my-account" ariaCurrentWhenActive="page" routerLinkActive="active">LOG IN</a>
      </main>
    } @else {
      @if (this.routes) {
        <table mat-table [dataSource]="routes" class="mat-elevation-z8">

          <!-- From Column -->
          <ng-container matColumnDef="from">
            <th mat-header-cell *matHeaderCellDef> From</th>
            <td mat-cell *matCellDef="let element">
              <input (click)="onCheckboxClick($event)" [attr.data-id]="element.key" type="checkbox"/>
              <img [src]="element.fromValue.iconUrl" mat-card-avatar/>
              <span>{{ element.fromValue.address }}</span>
            </td>
          </ng-container>

          <!-- To Column -->
          <ng-container matColumnDef="to">
            <th mat-header-cell *matHeaderCellDef> To</th>
            <td mat-cell *matCellDef="let element">
              <img [src]="element.toValue.iconUrl" mat-card-avatar/>
              <span>{{ element.toValue.address }}</span>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
        <button (click)="planRoutes()" mat-raised-button> See the most effective routes</button>
        <button mat-raised-button>
          <a routerLink="/" ariaCurrentWhenActive="page" routerLinkActive="active">Add new route</a>
        </button>
        @if (this.notification) {
          <div>
            <button mat-raised-button color={{this.notification.status}}>{{ this.notification.message }}</button>
          </div>
        }

      } @else {
        <h2>There are no routes</h2>
      }
    }
  `,
  styleUrls: ['../../app.component.scss', './my-routes-page.component.scss'],
})
export class MyRoutesPageComponent {
  routes: RouteType[] | undefined;
  displayedColumns: string[] = ['from', 'to'];
  notification: { message: string, status: 'warn' | 'accent' } | undefined;
  account: AccountType | undefined;

  constructor(private store: Store<{ routes: RouteType[], auth: { account: AccountType  }}>,
              public dialog: MatDialog,
              private http: HttpClient,) {

    // Fetch authentication token from local storage
    const authToken = localStorage.getItem('jwtToken');

    // Set up headers with Authorization token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    this.http.get<{routeTypes: RouteType[]}>(`${environment.apiUrl}/api/v1/route/get-routes`, { headers }).subscribe(
      (res: {routeTypes: RouteType[]}) => {
        console.log(res);
        const resCopy = parseRoutesForFrontend([...res.routeTypes]);
        console.log(resCopy)
        resCopy.sort((route1: RouteType, route2: RouteType) => {
          const address1 = route1.fromValue.address.toLowerCase();
          const address2 = route2.fromValue.address.toLowerCase();

          if (address1 < address2) {
            return -1;
          } else if (address1 > address2) {
            return 1;
          } else {
            return 0;
          }
        });

        this.routes = resCopy;
      },
      (error) => {
        console.error('Error fetching routes:', error);
        // Handle error appropriately (e.g., show a notification to the user)
      }
    );
    this.store.select('auth').subscribe(res => {
      this.account = res.account;
    });
  }

  protected selectedRoutes: string[] = [];
  protected plannedRoutes: RouteType[] = [];

  openDialog() {
    const newRoutes = this.plannedRoutes.map((route, index) => {
      return { ...route, position: index + 1 };
    });

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        routes: newRoutes,
        orders: [1, 2],
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onCheckboxClick = (event: Event) => {
    if (event.target) {
      const target = event.target as HTMLElement;
      const routeId = target.getAttribute('data-id') || '';
      if (!this.selectedRoutes.includes(routeId)) {
        this.selectedRoutes.push(routeId);
      } else {
        const indexToRemove: number = this.selectedRoutes.indexOf(routeId);

        if (indexToRemove !== -1) {
          this.selectedRoutes.splice(indexToRemove, 1);
        }
      }
    }
  }

  planRoutes = async () => {
    const routes = this.selectedRoutes.map(
      routeId => this.routes?.find(route => routeId === route.key)
    )
    if (!(this.selectedRoutes.length > 1)) return;
    if (!hasSameOrigin(this.selectedRoutes, this.routes)) {
      this.notification = {message: 'Select routes with same origin!', status: 'warn'}
      setTimeout(() => {
        this.notification = undefined
      }, 3000)
      return
    }
    if (routes) {
      const parsedRoute = parseRouteForPlanning(routes);
      if (!!parsedRoute && routes) {
        const plan = await routeMatrixRequest(parsedRoute);
        const routesSequence = plan.routes[0].optimizedIntermediateWaypointIndex;
        this.plannedRoutes = routesPlannerResult(routesSequence, routes)
        if (this.plannedRoutes) this.openDialog();
      }
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  styleUrl: './my-routes-page.component.scss',
  template: `
    <h2>The most effective route sequence: </h2>
    <table mat-table [dataSource]="data.routes" class="mat-elevation-z8">
      <!-- Position Column -->
      <ng-container matColumnDef="position">
        <th mat-header-cell *matHeaderCellDef> No.</th>
        <td mat-cell *matCellDef="let element"> {{ element.position }}</td>
      </ng-container>

      <!-- From Column -->
      <ng-container matColumnDef="from">
        <th mat-header-cell *matHeaderCellDef> From</th>
        <td mat-cell *matCellDef="let element">
          <img [src]="element.fromValue.iconUrl" mat-card-avatar/>
          <span>{{ element.fromValue.address }}</span>
        </td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="to">
        <th mat-header-cell *matHeaderCellDef> To</th>
        <td mat-cell *matCellDef="let element">
          <img [src]="element.toValue.iconUrl" mat-card-avatar/>
          <span>{{ element.toValue.address }}</span>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <button mat-raised-button (click)="onNoClick()">Close</button>
  `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTableModule,
  ],
})
export class DialogOverviewExampleDialog {
  displayedColumns: string[] = ['position', 'from', 'to'];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
