import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ItemDetailsComponent } from './components/item-details.component';

@NgModule({
  declarations: [
    ItemDetailsComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    // Angular Material
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ItemDetailsComponent,
  ]
})

export class ItemDetailsModule {

}
