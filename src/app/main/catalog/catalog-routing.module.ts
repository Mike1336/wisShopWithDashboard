import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogContainer } from './containers/catalog/catalog.container';

const routes: Routes = [
  {
    path: ':category',
    component: CatalogContainer,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'phones',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule { }
