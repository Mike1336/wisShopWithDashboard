import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabNav, MatTabsModule } from '@angular/material/tabs';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DataStorageService } from '../core/services/data-storage.service';

import { CatalogContainer } from './containers/catalog/catalog.container';
import { DataService } from './services/data.service';
import { CarouselModule } from './../layouts/carousel/carousel.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { FiltersComponent } from './components/filters/filters.component';
import { CategoryContentContainer } from './containers/category-content/category-content.container';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { CatalogComponent } from './components/catalog/catalog.component';


@NgModule({
  declarations: [
    CatalogComponent,
    CatalogContainer,
    FiltersComponent,
    ProductItemComponent,
    CategoryContentContainer,
  ],
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataStorageService),
    // Material
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    // Own
    CatalogRoutingModule,
    CarouselModule,
  ],
  providers: [
    DataService,
    MatTabNav,
  ],
})
export class CatalogModule { }
