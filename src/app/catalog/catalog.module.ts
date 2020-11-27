import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { PhonesComponent } from './components/phones/phones.component';
import { TabletsComponent } from './components/tablets/tablets.component';
import { LaptopsComponent } from './components/laptops/laptops.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CategoryNavigationComponent } from './components/category-navigation/category-navigation.component';
import { PhonesContainer } from './containers/phones/phones.container';
import { TabletsContainer } from './containers/tablets/tablets.container';
import { LaptopsContainer } from './containers/laptops/laptops.container';
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
    // Own
    CatalogRoutingModule,
    SharedModule,
  ],
})
export class CatalogModule { }
