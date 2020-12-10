import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { TableModule } from '../../layouts/table/table.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    // Angular Material
    MatIconModule,
    // Own
    DashboardRoutingModule,
    TableModule,
  ],
})
export class DashboardModule { }
