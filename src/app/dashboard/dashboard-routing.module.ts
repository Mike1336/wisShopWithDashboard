import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './guards/login.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LoginGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
