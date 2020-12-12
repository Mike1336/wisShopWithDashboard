import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DataStorageService } from '../core/services/data-storage.service';

import { DataService } from './services/data.service';
import { NavbarModule } from './navbar/navbar.module';
import { HeaderModule } from './header/header.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ItemDetailsModule } from './../layouts/item-details/item-details.module';


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataStorageService),
    // Angular Material
    MatSidenavModule,
    MatSnackBarModule,
    // Own
    MainRoutingModule,
    HeaderModule,
    NavbarModule,
    ItemDetailsModule,
  ],
  providers: [
    DataService,
  ],
})
export class MainModule { }
