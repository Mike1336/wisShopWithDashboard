import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    children: [
      {
        path: 'phones',
        loadChildren: () => import('./phones/phones.module').then((m) => m.PhonesModule),
      },
      {
        path: 'tablets',
        loadChildren: () => import('./tablets/tablets.module').then((m) => m.TabletsModule),
      },
      {
        path: 'laptops',
        loadChildren: () => import('./laptops/laptops.module').then((m) => m.LaptopsModule),
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
