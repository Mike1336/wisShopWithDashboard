import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTabNav, MatTabsModule } from '@angular/material/tabs';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { CategoryNavigationContainer } from './containers/category-navigation/category-navigation.container';


@NgModule({
  declarations: [
    CatalogComponent,
    CatalogContainer,
    FiltersComponent,
    ProductItemComponent,
    CategoryContentContainer,
    CategoryNavigationContainer,
  ],
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataStorageService),
    // ng-bootstrap
    NgbModule,
    // Material
    MatTabsModule,
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
