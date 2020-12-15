import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CountChangerComponent } from './count-changer.component';
import { DigitsOnlyDirective } from './directives/digits-only.directive';


@NgModule({
  declarations: [
    CountChangerComponent,
    DigitsOnlyDirective,
  ],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Angular Material
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  exports: [
    CountChangerComponent,
  ],
})
export class CountChangerModule { }
