import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '../shared/table';

import { LoginGuard } from './guards/login.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { PhoneStoreService } from './../shared/services/phone-store.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    // Angular
    CommonModule,
    // Own
    DashboardRoutingModule,
    TableModule,
    AuthModule,
  ],
  providers: [
    PhoneStoreService,
    DashboardGuard,
    LoginGuard,
  ],
})
export class DashboardModule { }
