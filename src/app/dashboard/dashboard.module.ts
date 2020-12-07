import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import { NavbarContainer } from './containers/navbar/navbar.container';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableModule } from './../layouts/table/table.module';
import { PhoneStoreService } from './../shared/services/phone-store.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AuthModule } from './../auth/auth.module';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    NavbarContainer,
  ],
  imports: [
    // Angular
    CommonModule,
    // Angular Material
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    // Own
    DashboardRoutingModule,
    TableModule,
    AuthModule,
  ],
  providers: [
    PhoneStoreService,
  ],
})
export class DashboardModule { }
