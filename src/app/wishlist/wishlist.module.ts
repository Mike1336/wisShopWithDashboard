import { NavbarModule } from './../shared/navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ItemDetailsModule } from '../layouts/item-details/item-details.module';

import { DeleteConfirmingComponent } from './components/delete-confirming/delete-confirming.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './components/wishlist/wishlist.component';


@NgModule({
  declarations: [
    WishlistComponent,
    DeleteConfirmingComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    // Angular Material
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    // Own
    WishlistRoutingModule,
    ItemDetailsModule,
    NavbarModule,
  ],
})
export class WishlistModule { }
