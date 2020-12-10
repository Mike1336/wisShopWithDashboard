import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'catalog',
        loadChildren: () => import('./catalog/catalog.module').then((m) => m.CatalogModule),
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'wishlist',
        loadChildren: () => import('./wishlist/wishlist.module').then((m) => m.WishlistModule),
      },
    ],
  },
  {
    path: '**',
    loadChildren: () => import('../not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
