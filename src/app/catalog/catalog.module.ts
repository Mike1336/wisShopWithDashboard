import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CarouselModule } from './../layouts/carousel/carousel.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { LaptopsComponent } from './laptops/components/laptops/laptops.component';
import { TabletsComponent } from './tablets/components/tablets/tablets.component';
import { PhonesComponent } from './phones/components/phones/phones.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CategoryNavigationComponent } from './components/category-navigation/category-navigation.component';
import { LaptopsContainer } from './laptops/containers/laptops/laptops.container';
import { TabletsContainer } from './tablets/containers/tablets/tablets.container';
import { PhonesContainer } from './phones/containers/phones/phones.container';
import { CategoryNavigationContainer } from './containers/category-navigation/category-navigation.container';


@NgModule({
  declarations: [
    CatalogComponent,
    PhonesComponent,
    TabletsComponent,
    LaptopsComponent,
    FiltersComponent,
    CategoryNavigationComponent,
    PhonesContainer,
    TabletsContainer,
    LaptopsContainer,
    CategoryNavigationContainer,
  ],
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    // ng-bootstrap
    NgbModule,
    // Own
    CatalogRoutingModule,
    CarouselModule,
  ],
})
export class CatalogModule { }
