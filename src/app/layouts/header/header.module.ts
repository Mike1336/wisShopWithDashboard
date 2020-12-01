import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  exports: [
    HeaderContainer,
    HeaderComponent,
  ],
})
export class HeaderModule { }
