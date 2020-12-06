import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { ItemDetailsModule } from '../layouts/item-details/item-details.module';
import { DeleteConfirmingComponent } from './components/delete-confirming/delete-confirming.component';
import { CartComponent } from './components/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';


@NgModule({
  declarations: [
    CartComponent,
    DeleteConfirmingComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    // Angular Material
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule,
    // Own
    ItemDetailsModule,
    CartRoutingModule,
  ],
})
export class CartModule { }
