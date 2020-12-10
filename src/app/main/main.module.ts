import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DataService } from '../core/services/data.service';

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
