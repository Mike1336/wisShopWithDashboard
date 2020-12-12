import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AuthModule } from '../auth/auth.module';
import { ItemDetailsModule } from '../layouts/item-details/item-details.module';
import { DataStorageService } from '../core/services/data-storage.service';

import { DataService } from './services/data.service';
import { NavbarModule } from './navbar/navbar.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarService } from './navbar/services/navbar.service';
import { HeaderModule } from './header/header.module';


@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataStorageService),
    // Angular Material
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    // Own
    AdminRoutingModule,
    AuthModule,
    HeaderModule,
    NavbarModule,
    ItemDetailsModule,

  ],
  providers: [
    NavbarService,
    DataService,
  ],

})
export class AdminModule { }
