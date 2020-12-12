import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Angular Material
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [
    SearchComponent,
  ],
  providers: [
    // SearchService,
  ],
})
export class SearchModule { }
