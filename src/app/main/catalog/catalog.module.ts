import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ItemDetailsModule } from '../../layouts/item-details/item-details.module';

import { CatalogContainer } from './containers/catalog/catalog.container';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CategoryContentContainer } from './containers/category-content/category-content.container';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { PaginatorComponent } from './components/paginator/paginator.component';


@NgModule({
  declarations: [
    CatalogComponent,
    CatalogContainer,
    ProductItemComponent,
    CategoryContentContainer,
    PaginatorComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    // Material
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    // Own
    CatalogRoutingModule,
    ItemDetailsModule,
  ],
})
export class CatalogModule { }
