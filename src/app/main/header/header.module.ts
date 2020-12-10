import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { SearchService } from '../header/search/services/search.service';

import { SearchModule } from './search/search.module';
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
    MatIconModule,
    MatBadgeModule,
    // Own
    SearchModule,
  ],
  exports: [
    HeaderContainer,
    HeaderComponent,
  ],
  providers: [
    SearchService,
  ]
})
export class HeaderModule { }
