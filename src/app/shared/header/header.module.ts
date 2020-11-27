import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
  ],
})
export class HeaderModule { }
