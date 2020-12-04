import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


import { HeaderComponent } from './components/header/header.component';
import { HeaderContainer } from './containers/header/header.container';

@NgModule({
  declarations: [
    HeaderContainer,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    // Angular Material
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [
    HeaderContainer,
    HeaderComponent,
  ],
})
export class HeaderModule { }
