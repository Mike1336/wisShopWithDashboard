import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaptopsContainer } from './laptops/containers/laptops/laptops.container';
import { TabletsContainer } from './tablets/containers/tablets/tablets.container';
import { PhonesContainer } from './phones/containers/phones/phones.container';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    children: [
      {
        path: 'phones',
        component: PhonesContainer,
      },
      {
        path: 'tablets',
        component: TabletsContainer,
      },
      {
        path: 'laptops',
        component: LaptopsContainer,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'phones',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule { }
