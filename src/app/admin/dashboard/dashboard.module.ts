import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
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
    MatButtonModule,
    // Own
    DashboardRoutingModule,
    TableModule,
  ],
})
export class DashboardModule { }
