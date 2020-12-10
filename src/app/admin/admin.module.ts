import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { DataService } from '../core/services/data.service';
import { AuthModule } from '../auth/auth.module';
import { ItemDetailsModule } from '../layouts/item-details/item-details.module';

import { PhoneStoreService } from './services/phone-store.service';
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
    PhoneStoreService,
    NavbarService,
    DataService,
  ],

})
export class AdminModule { }
