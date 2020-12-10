import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { UnauthGuard } from './auth/guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./preview/preview.module').then((m) => m.PreviewModule),
    canActivate: [UnauthGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [UnauthGuard],
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canActivate: [UnauthGuard],
  },
  {
    path: '404',
    loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
