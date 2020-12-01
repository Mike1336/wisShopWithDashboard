import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from './../layouts/table/table.module';
import { PhoneStoreService } from './../shared/services/phone-store.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AuthModule } from './../auth/auth.module';


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
  ],
})
export class DashboardModule { }
